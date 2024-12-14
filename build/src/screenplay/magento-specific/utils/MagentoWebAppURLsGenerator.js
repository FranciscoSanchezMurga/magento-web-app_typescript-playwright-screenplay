"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MagentoWebAppURLsGenerator {
    static getBaseURL() {
        const baseURL = process.env.BASEURL_MAGENTOAPP;
        if (!baseURL) {
            throw new Error('The environment variable BASEURL_MAGENTOAPP is not defined.');
        }
        return baseURL;
    }
    static ordersAndReturnsGuestFormURL() {
        return `${this.getBaseURL()}/sales/guest/form/`;
    }
}
exports.default = MagentoWebAppURLsGenerator;
//# sourceMappingURL=MagentoWebAppURLsGenerator.js.map