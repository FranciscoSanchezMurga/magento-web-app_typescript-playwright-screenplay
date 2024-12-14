"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PageElement {
    elementSelector;
    constructor(elementSelector) {
        this.elementSelector = elementSelector;
    }
    ;
    static considering(elementSelector) {
        return new PageElement(elementSelector);
    }
    ;
    async answeredBy(actor) {
        return actor.browsingWebAbility.locateElement(this.elementSelector);
    }
}
exports.default = PageElement;
;
//# sourceMappingURL=PageElement.js.map