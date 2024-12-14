"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeOnElement {
    elementSelector;
    value;
    constructor(elementSelector, value) {
        this.elementSelector = elementSelector;
        this.value = value;
    }
    ;
    static considering(elementSelector, value) {
        return new TypeOnElement(elementSelector, value);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.typeValue_OnElement_(this.value, this.elementSelector);
    }
}
exports.default = TypeOnElement;
;
//# sourceMappingURL=TypeOnElement.js.map