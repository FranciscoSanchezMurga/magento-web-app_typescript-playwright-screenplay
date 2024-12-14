"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElementAttributeIncludesValue {
    attributeName;
    value;
    elementSelector;
    constructor(attributeName, value, elementSelector) {
        this.attributeName = attributeName;
        this.value = value;
        this.elementSelector = elementSelector;
    }
    ;
    static given(attributeName, value, elementSelector) {
        return new ElementAttributeIncludesValue(attributeName, value, elementSelector);
    }
    ;
    async answeredBy(actor) {
        return await actor.browsingWebAbility.checkAttributeValueFromElement(this.attributeName, this.value, this.elementSelector);
    }
}
exports.default = ElementAttributeIncludesValue;
;
//# sourceMappingURL=ElementAttributeIncludesValue.js.map