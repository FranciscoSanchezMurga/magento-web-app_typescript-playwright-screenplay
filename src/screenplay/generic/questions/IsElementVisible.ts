import type Actor from '../Actor';
import IQuestion from '../models/interfaces/IQuestion';

export default class IsElementVisible implements IQuestion<boolean> {

    constructor(
        public elementSelector: string
    ) { };

    static given(elementSelector: string) {
        return new IsElementVisible(elementSelector)
    };

    async answeredBy(actor: Actor): Promise<boolean> {
        return await actor.browsingWebAbility.checkVisibilityOfElement_(this.elementSelector)
    }

};