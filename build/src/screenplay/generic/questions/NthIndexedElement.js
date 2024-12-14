"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NthIndexedElement {
    elementsSelector;
    index;
    constructor(elementsSelector, index) {
        this.elementsSelector = elementsSelector;
        this.index = index;
    }
    ;
    static considering(elementsSelector, index) {
        return new NthIndexedElement(elementsSelector, index);
    }
    ;
    async answeredBy(actor) {
        if (this.index < 0) {
            console.error(`INVALID INDEX: Prompted index "${this.index}" is less than 0.`);
            return null;
        }
        const numberOfElements = await actor.browsingWebAbility.countLocatedElements(this.elementsSelector);
        if (numberOfElements === 0) {
            console.error(`NO ELEMENTS FOUND: No elements match the selector "${this.elementsSelector}".`);
            return null;
        }
        if (this.index >= numberOfElements) {
            console.error(`INVALID INDEX: Prompted index "${this.index}" exceeds the number of available elements that match the selector "${this.elementsSelector}", i.e. "${numberOfElements}".`);
            return null;
        }
        return await actor.browsingWebAbility.locateNthIndexedElement(this.elementsSelector, this.index);
    }
}
exports.default = NthIndexedElement;
;
//# sourceMappingURL=NthIndexedElement.js.map