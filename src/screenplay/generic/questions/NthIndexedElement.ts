import type Actor from '../Actor';
import IQuestion from '../models/interfaces/IQuestion';
import {LocatorTypes} from '../models/types/uniformTypesForDifferentFrameworks';

export default class NthIndexedElement implements IQuestion<LocatorTypes> {

    constructor(
        public elementsSelector: string,
        public index: number
    ) { };

    static considering(elementsSelector: string, index: number) {
        return new NthIndexedElement(elementsSelector, index)
    };

    async answeredBy(actor: Actor): Promise<LocatorTypes | null> {
        if (this.index < 0) {
            console.error(`INVALID INDEX: Prompted index "${this.index}" is less than 0.`);
            return null;
        }
        const numberOfElements = await actor.browsingWebAbility.countLocatedElements(this.elementsSelector);
        if (numberOfElements === 0) {
            console.error(`NO ELEMENTS FOUND: No elements match the selector "${this.elementsSelector}".`);
            return null
        }
        if (this.index >= numberOfElements) {
            console.error(`INVALID INDEX: Prompted index "${this.index}" exceeds the number of available elements that match the selector "${this.elementsSelector}", i.e. "${numberOfElements}".`);
            return null
        }
        return await actor.browsingWebAbility.locateNthIndexedElement(this.elementsSelector, this.index)
    }

};