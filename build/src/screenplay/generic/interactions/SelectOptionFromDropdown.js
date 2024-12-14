"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectOptionFromDropdown {
    elementSelector;
    value;
    constructor(elementSelector, value) {
        this.elementSelector = elementSelector;
        this.value = value;
    }
    ;
    static considering(dropdownSelector, dropdownOption) {
        return new SelectOptionFromDropdown(dropdownSelector, dropdownOption);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.selectFromDropdown_TheOption_(this.elementSelector, this.value);
    }
}
exports.default = SelectOptionFromDropdown;
;
//# sourceMappingURL=SelectOptionFromDropdown.js.map