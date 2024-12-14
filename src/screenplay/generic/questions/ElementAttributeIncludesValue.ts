import type Actor from '../Actor';
import IQuestion from '../models/interfaces/IQuestion';

export default class ElementAttributeIncludesValue implements IQuestion<boolean> {

    constructor(
        public attributeName: string,
        public value: string,
        public elementSelector: string
    ) { };

    static given(attributeName: string, value: string, elementSelector: string) {
        return new ElementAttributeIncludesValue(attributeName, value, elementSelector)
    };

    async answeredBy(actor: Actor): Promise<boolean> {
        return await actor.browsingWebAbility.checkAttributeValueFromElement(this.attributeName, this.value, this.elementSelector)
    }

};