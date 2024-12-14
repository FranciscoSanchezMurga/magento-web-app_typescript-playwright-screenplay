"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ensure {
    assertableValueAndAssertionPairs;
    /**
     * Constructor that accepts an array of pairs where each pair consists of:
     * - An assertable value, which can either be a direct value or an IQuestion
     * - A corresponding assertion method to be executed for that value
     */
    constructor(assertableValueAndAssertionPairs // See: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html
    ) {
        this.assertableValueAndAssertionPairs = assertableValueAndAssertionPairs;
    }
    /**
     * Static factory method to create an instance of Ensure.
     * It accepts an arbitrary number of assertable value and assertion pairs.
     */
    static that(...assertableValuesAndAssertionsPairs) {
        return new Ensure(assertableValuesAndAssertionsPairs);
    }
    /**
     * Method that iterates through each pair of assertable value and assertion,
     * resolving the value (if it is an IQuestion) and applying the corresponding assertion.
     */
    async performAs(actor) {
        for (const [directValueOrQuestionToAnswer, assertionMethod] of this.assertableValueAndAssertionPairs) {
            const value = await this.getValue(actor, directValueOrQuestionToAnswer);
            await assertionMethod(value); // Execute the assertion with the resolved value
        }
    }
    /**
     * Method to retrieve the actual value for the assertion.
     * If the first parameter is an instance of IQuestion, it must be resolved by calling answeredBy().
     * Otherwise, it is treated as a direct value.
     */
    async getValue(actor, directValueOrQuestionToAnswer) {
        if (this.isQuestion(directValueOrQuestionToAnswer)) {
            return await directValueOrQuestionToAnswer.answeredBy(actor); // Resolve IQuestion
        }
        return directValueOrQuestionToAnswer; // Direct value, no resolution needed
    }
    /**
     * Type guard to determine if a given value implements the IQuestion interface.
     * This is used to identify whether we need to resolve the value by calling answeredBy().
     */
    isQuestion(directValueOrQuestionToAnswer) {
        return typeof directValueOrQuestionToAnswer.answeredBy === 'function';
    }
}
exports.default = Ensure;
//# sourceMappingURL=Ensure.js.map