"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteContent {
    elementSelector;
    constructor(elementSelector) {
        this.elementSelector = elementSelector;
    }
    ;
    static of(elementSelector) {
        return new DeleteContent(elementSelector);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.deleteContentOfElement_(this.elementSelector);
    }
}
exports.default = DeleteContent;
;
//# sourceMappingURL=DeleteContent.js.map