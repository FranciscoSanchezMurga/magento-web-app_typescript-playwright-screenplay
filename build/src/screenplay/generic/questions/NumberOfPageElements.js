"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberOfPageElements {
    elementsSelector;
    constructor(elementsSelector) {
        this.elementsSelector = elementsSelector;
    }
    ;
    static sharingSelector(elementsSelector) {
        return new NumberOfPageElements(elementsSelector);
    }
    ;
    async answeredBy(actor) {
        return await actor.browsingWebAbility.countLocatedElements(this.elementsSelector);
    }
}
exports.default = NumberOfPageElements;
;
//# sourceMappingURL=NumberOfPageElements.js.map