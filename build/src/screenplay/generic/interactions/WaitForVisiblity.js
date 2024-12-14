"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WaiTForVisibility {
    elementSelector;
    constructor(elementSelector) {
        this.elementSelector = elementSelector;
    }
    ;
    static of(elementSelector) {
        return new WaiTForVisibility(elementSelector);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.waitForVisibilityOfElement_(this.elementSelector);
    }
}
exports.default = WaiTForVisibility;
;
//# sourceMappingURL=WaitForVisiblity.js.map