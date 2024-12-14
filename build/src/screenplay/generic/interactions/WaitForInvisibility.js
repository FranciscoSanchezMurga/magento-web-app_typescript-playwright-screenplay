"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WaitForInvisibility {
    elementSelector;
    constructor(elementSelector) {
        this.elementSelector = elementSelector;
    }
    ;
    static of(elementSelector) {
        return new WaitForInvisibility(elementSelector);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.waitForHiddennessOfElement_(this.elementSelector);
    }
}
exports.default = WaitForInvisibility;
;
//# sourceMappingURL=WaitForInvisibility.js.map