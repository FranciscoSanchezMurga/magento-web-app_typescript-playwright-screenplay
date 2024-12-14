import IBrowsingWebAbility from './models/interfaces/iBrowsingWebAbility';
import IActivity from './models/interfaces/IActivity';
import IQuestion from "./models/interfaces/IQuestion";

export default class Actor {

    private constructor(
        public browsingWebAbility: IBrowsingWebAbility
    ) { }

    static whoHasTheAbilityTo(browsingWebAbility: IBrowsingWebAbility): Actor {
        return new Actor(browsingWebAbility)
    }

    async attemptsTo(...performableActions: IActivity[]): Promise<void> {
        for (const performableAction of performableActions) {
            await performableAction.performAs(this)
        }
    }

    async answers<T>(question: IQuestion<T>): Promise<T> {
        return question.answeredBy(this);
    }

};

