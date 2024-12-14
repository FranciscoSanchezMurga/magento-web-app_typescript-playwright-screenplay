"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleClick {
    elemenSelector;
    constructor(elemenSelector) {
        this.elemenSelector = elemenSelector;
    }
    ;
    static on(elementSelector) {
        return new SimpleClick(elementSelector);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.simpleClickOnElement_(this.elemenSelector);
    }
}
exports.default = SimpleClick;
;
//# sourceMappingURL=SimpleClick.js.map