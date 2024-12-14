import type Actor from '../Actor';
import IQuestion from '../models/interfaces/IQuestion';

export default class NumberOfPageElements implements IQuestion<number> {

    constructor(
        public elementsSelector: string
    ) { };

    static sharingSelector(elementsSelector: string) {
        return new NumberOfPageElements(elementsSelector)
    };

    async answeredBy(actor: Actor): Promise<number> {
        return await actor.browsingWebAbility.countLocatedElements(this.elementsSelector)
    }

};