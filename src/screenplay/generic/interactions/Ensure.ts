import IQuestion from '../models/interfaces/IQuestion';
import IActivity from '../models/interfaces/IActivity';
import {AssertableValues, AssertableValueAndAssertionPair, NonVoid} from '../models/types/usefulTypes';
import Actor from '../Actor';

export default class Ensure<T extends any[]> implements IActivity {

    /**
     * Constructor that accepts an array of pairs where each pair consists of:
     * - An assertable value, which can either be a direct value or an IQuestion
     * - A corresponding assertion method to be executed for that value
     */
    constructor(
        private assertableValueAndAssertionPairs: { [K in keyof T]: AssertableValueAndAssertionPair<T[K]> } // See: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html
    ) {}

    /**
     * Static factory method to create an instance of Ensure.
     * It accepts an arbitrary number of assertable value and assertion pairs.
     */
    static that<T extends any[]>(...assertableValuesAndAssertionsPairs: { [K in keyof T]: AssertableValueAndAssertionPair<T[K]> }): Ensure<T> {
        return new Ensure<T>(assertableValuesAndAssertionsPairs);
    }

    /**
     * Method that iterates through each pair of assertable value and assertion,
     * resolving the value (if it is an IQuestion) and applying the corresponding assertion.
     */
    async performAs(actor: Actor): Promise<void> {
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
    private async getValue<K>(actor: Actor, directValueOrQuestionToAnswer: AssertableValues<K>): Promise<NonVoid<K>> {
        if (this.isQuestion(directValueOrQuestionToAnswer)) {
            return await directValueOrQuestionToAnswer.answeredBy(actor); // Resolve IQuestion
        }
        return directValueOrQuestionToAnswer as NonVoid<K>; // Direct value, no resolution needed
    }

    /**
     * Type guard to determine if a given value implements the IQuestion interface.
     * This is used to identify whether we need to resolve the value by calling answeredBy().
     */
    private isQuestion<K>(directValueOrQuestionToAnswer: AssertableValues<K>): directValueOrQuestionToAnswer is IQuestion<NonVoid<K>> {
        return typeof (directValueOrQuestionToAnswer as IQuestion<NonVoid<K>>).answeredBy === 'function';
    }
}

