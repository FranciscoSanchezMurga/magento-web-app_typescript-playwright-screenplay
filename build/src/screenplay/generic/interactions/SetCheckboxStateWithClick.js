"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetCheckboxStateWithClick {
    checkboxSelector;
    checkOrUncheck;
    constructor(checkboxSelector, checkOrUncheck) {
        this.checkboxSelector = checkboxSelector;
        this.checkOrUncheck = checkOrUncheck;
    }
    ;
    static byUsing(checkboxSelector, checkOrUnchecked) {
        return new SetCheckboxStateWithClick(checkboxSelector, checkOrUnchecked);
    }
    ;
    async performAs(actor) {
        const isAlreadyChecked = await actor.browsingWebAbility.verifyCheckboxState(this.checkboxSelector);
        if (isAlreadyChecked !== this.checkOrUncheck) {
            await actor.browsingWebAbility.simpleClickOnElement_(this.checkboxSelector);
        }
    }
}
exports.default = SetCheckboxStateWithClick;
;
//# sourceMappingURL=SetCheckboxStateWithClick.js.map