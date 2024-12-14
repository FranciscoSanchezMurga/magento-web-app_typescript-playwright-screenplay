"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IsElementVisible {
    elementSelector;
    constructor(elementSelector) {
        this.elementSelector = elementSelector;
    }
    ;
    static given(elementSelector) {
        return new IsElementVisible(elementSelector);
    }
    ;
    async answeredBy(actor) {
        return await actor.browsingWebAbility.checkVisibilityOfElement_(this.elementSelector);
    }
}
exports.default = IsElementVisible;
;
//# sourceMappingURL=IsElementVisible.js.map