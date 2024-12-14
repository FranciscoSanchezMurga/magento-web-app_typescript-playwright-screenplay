export default class MagentoWebAppURLsGenerator {
    private static getBaseURL(): string {
        const baseURL = process.env.BASEURL_MAGENTOAPP;
        if (!baseURL) {
            throw new Error('The environment variable BASEURL_MAGENTOAPP is not defined.');
        }
        return baseURL;
    }

    static ordersAndReturnsGuestFormURL(): string {
        return `${this.getBaseURL()}/sales/guest/form/`;
    }
}
