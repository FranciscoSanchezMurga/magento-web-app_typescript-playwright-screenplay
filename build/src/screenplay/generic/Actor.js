"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Actor {
    browsingWebAbility;
    constructor(browsingWebAbility) {
        this.browsingWebAbility = browsingWebAbility;
    }
    static whoHasTheAbilityTo(browsingWebAbility) {
        return new Actor(browsingWebAbility);
    }
    async attemptsTo(...performableActions) {
        for (const performableAction of performableActions) {
            await performableAction.performAs(this);
        }
    }
    async answers(question) {
        return question.answeredBy(this);
    }
}
exports.default = Actor;
;
//# sourceMappingURL=Actor.js.map