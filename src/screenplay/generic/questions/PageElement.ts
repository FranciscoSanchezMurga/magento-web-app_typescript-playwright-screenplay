import type Actor from '../Actor';
import IQuestion from '../models/interfaces/IQuestion';
import {LocatorTypes} from '../models/types/uniformTypesForDifferentFrameworks';

export default class PageElement implements IQuestion<LocatorTypes> {

    constructor(
        public elementSelector: string
    ) { };

    static considering(elementSelector: string) {
        return new PageElement(elementSelector)
    };

    async answeredBy(actor: Actor): Promise<LocatorTypes> {
        return actor.browsingWebAbility.locateElement(this.elementSelector)
    }

};