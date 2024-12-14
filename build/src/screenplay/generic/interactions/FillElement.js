"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FillElement {
    elementSelector;
    value;
    constructor(elementSelector, value) {
        this.elementSelector = elementSelector;
        this.value = value;
    }
    ;
    static considering(elementSelector, input) {
        return new FillElement(elementSelector, input);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.fillElement_With_(this.elementSelector, this.value);
    }
}
exports.default = FillElement;
;
//# sourceMappingURL=FillElement.js.map