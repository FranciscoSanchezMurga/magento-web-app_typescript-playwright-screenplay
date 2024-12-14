"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Navigate {
    url;
    constructor(url) {
        this.url = url;
    }
    ;
    static to(url) {
        return new Navigate(url);
    }
    ;
    async performAs(actor) {
        await actor.browsingWebAbility.navigateToURL_(this.url);
    }
}
exports.default = Navigate;
;
//# sourceMappingURL=Navigate.js.map