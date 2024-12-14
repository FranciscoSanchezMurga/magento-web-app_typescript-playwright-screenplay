"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const BrowsingWebWithPlaywright_1 = __importDefault(require("../src/screenplay/generic/abilities/BrowsingWebWithPlaywright"));
const Actor_1 = __importDefault(require("../src/screenplay/generic/Actor"));
const Navigate_1 = __importDefault(require("../src/screenplay/generic/interactions/Navigate"));
const SimpleClick_1 = __importDefault(require("../src/screenplay/generic/interactions/SimpleClick"));
const FillFormFields_1 = __importDefault(require("../src/screenplay/magento-specific/tasks/ordersAndReturns/FillFormFields"));
const MagentoWebAppURLsGenerator_1 = __importDefault(require("../src/screenplay/magento-specific/utils/MagentoWebAppURLsGenerator"));
const ordersAndReturnsUI_1 = __importDefault(require("../src/screenplay/magento-specific/ui/ordersAndReturnsUI"));
const Ensure_1 = __importDefault(require("../src/screenplay/generic/interactions/Ensure"));
const PageElement_1 = __importDefault(require("../src/screenplay/generic/questions/PageElement"));
const AssertionsWithPlaywright_1 = require("../src/assertions/AssertionsWithPlaywright");
let notLoggedMagentaAppUser;
test_1.test.describe('Test Suite where the ScreenPlay pattern is used as much as it was possible (lack of time forced me to use part of codes no following design pattern).', async () => {
    test_1.test.beforeEach(async ({ page }) => {
        // Instantiation of an Actor class, the center of the ScreenPlay model.
        notLoggedMagentaAppUser = Actor_1.default.whoHasTheAbilityTo(BrowsingWebWithPlaywright_1.default.generateForUsageWith(page));
        // Util/Help class.
        const ORDERS_AND_RETURNS_URL = MagentoWebAppURLsGenerator_1.default.ordersAndReturnsGuestFormURL();
        // Next, an example of an Interaction class.
        // The Actor can attempt to execute Performable Actions (Interactions, Tasks) in 2 ways:
        // 1) It can be read as if an specific performable action is attempted to be executed by an Actor.
        await Navigate_1.default.to(ORDERS_AND_RETURNS_URL).performAs(notLoggedMagentaAppUser);
    });
    test_1.test.afterEach(async ({ page }) => {
        await page.close();
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the field "Order ID" is required to send the guest form.', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: null,
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'fakeemail@followingsyntax.com'
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredOrderIdErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredOrderIdErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the field "Billing Last Name" is required to send the guest form.', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: null,
            findOrderBy: 'email',
            emailOrZipCode: 'fakeemail@followingsyntax.com'
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredBillingLastNameErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredBillingLastNameErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the "Email" field is required to send the guest form.', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'email',
            emailOrZipCode: null
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the "Email" field requires a valid address when introducing a simple string.', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'simple.string'
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the "Email" field requires a valid address when using "localpart@".', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'localpart@'
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify the "Email" field requires a valid address when using "localpart@domain-not-dot-com".', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'localpart@domain-not-dot-com'
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');
    });
    test_1.test.only('SCREEN-PLAY: Verify the "Zip Code" field is required to send the guest form.', async ({ page }) => {
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with({
            orderID: 'FAKE-ORDER-ID',
            billingLastName: 'Fake Billing Last Name',
            findOrderBy: 'zip',
            emailOrZipCode: null
        }).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([requestTriggered, AssertionsWithPlaywright_1.assertions.isNotTrue], [PageElement_1.default.considering(ordersAndReturnsUI_1.default.missingRequiredZipCodeErrorMessage), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator(ordersAndReturnsUI_1.default.missingRequiredZipCodeErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');
    });
    (0, test_1.test)('SCREEN-PLAY: Verify positive scenario when all infor is correct (by using "Email").', async ({ page }) => {
        const VALID_FORM_DATA_WITH_EMAIL = {
            orderID: '000032042',
            billingLastName: 'New Address 3 - Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'test.fran@testqafran.com'
        };
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with(VALID_FORM_DATA_WITH_EMAIL).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([PageElement_1.default.considering('h1.page-title > span.base'), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator('h1.page-title > span.base'), 'Correct order!').toContainText(`Order # ${VALID_FORM_DATA_WITH_EMAIL.orderID}`);
    });
    (0, test_1.test)('SCREEN-PLAY: Verify positive scenario when all infor is correct (by using "Zip Code").', async ({ page }) => {
        const VALID_FORM_DATA_WITH_ZIP = {
            orderID: '000032042',
            billingLastName: 'New Address 3 - Last Name',
            findOrderBy: 'zip',
            emailOrZipCode: '40000'
        };
        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFormFields_1.default.with(VALID_FORM_DATA_WITH_ZIP).performAs(notLoggedMagentaAppUser);
        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });
        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.
        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.
        await notLoggedMagentaAppUser.attemptsTo(SimpleClick_1.default.on(ordersAndReturnsUI_1.default.continueButon), Ensure_1.default.that([PageElement_1.default.considering('h1.page-title > span.base'), AssertionsWithPlaywright_1.assertions.elementIsVisible]));
        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await (0, test_1.expect)(page.locator('h1.page-title > span.base'), 'Correct order!').toContainText(`Order # ${VALID_FORM_DATA_WITH_ZIP.orderID}`);
    });
});
//# sourceMappingURL=ordersAndReturns.spec.js.map