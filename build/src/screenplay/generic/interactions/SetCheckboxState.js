"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetCheckboxState {
    checkboxSelector;
    checkOrUnchecked;
    constructor(checkboxSelector, checkOrUnchecked) {
        this.checkboxSelector = checkboxSelector;
        this.checkOrUnchecked = checkOrUnchecked;
    }
    ;
    static byUsing(checkboxSelector, checkOrUnchecked) {
        return new SetCheckboxState(checkboxSelector, checkOrUnchecked);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.setCheckboxState(this.checkboxSelector, this.checkOrUnchecked);
    }
}
exports.default = SetCheckboxState;
;
//# sourceMappingURL=SetCheckboxState.js.map