import { test, expect } from '@playwright/test';
import BrowsingWebWithPlaywright from '../src/screenplay/generic/abilities/BrowsingWebWithPlaywright';
import Actor from '../src/screenplay/generic/Actor';
import Navigate from '../src/screenplay/generic/interactions/Navigate';
import SimpleClick from '../src/screenplay/generic/interactions/SimpleClick';
import FillFieldsFromOrdersAndReturnsForm from '../src/screenplay/magento-specific/tasks/ordersAndReturns/FillFormFields';
import MagentoWebAppURLsGenerator from '../src/screenplay/magento-specific/utils/MagentoWebAppURLsGenerator';
import OrdersAndReturnsGuestForm from '../src/screenplay/magento-specific/ui/ordersAndReturnsUI';
import Ensure from '../src/screenplay/generic/interactions/Ensure';
import PageElement from '../src/screenplay/generic/questions/PageElement';
import { assertions } from '../src/assertions/AssertionsWithPlaywright';
import IRequiredInforForOrdersAndReturnsForm from '../src/screenplay/magento-specific/models/IRequiredInforForOrdersAndReturnsFrom';

let notLoggedMagentaAppUser: Actor;

test.describe('Test Suite where the ScreenPlay pattern is used as much as it was possible (lack of time forced me to use part of codes no following design pattern).', async () => {

    test.beforeEach(async ({ page }) => {

        // Instantiation of an Actor class, the center of the ScreenPlay model.
        notLoggedMagentaAppUser = Actor.whoHasTheAbilityTo(BrowsingWebWithPlaywright.generateForUsageWith(page));

        // Util/Help class.
        const ORDERS_AND_RETURNS_URL = MagentoWebAppURLsGenerator.ordersAndReturnsGuestFormURL();

        // Next, an example of an Interaction class.
        // The Actor can attempt to execute Performable Actions (Interactions, Tasks) in 2 ways:
        // 1) It can be read as if an specific performable action is attempted to be executed by an Actor.
        await Navigate.to(ORDERS_AND_RETURNS_URL).performAs(notLoggedMagentaAppUser);

    });

    test.afterEach(async({page}) => {
        await page.close()
    })

    test('SCREEN-PLAY: Verify the field "Order ID" is required to send the guest form.', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: null,
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'email',
                emailOrZipCode: 'fakeemail@followingsyntax.com'
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');

    });

    test('SCREEN-PLAY: Verify the field "Billing Last Name" is required to send the guest form.', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: null,
                findOrderBy: 'email',
                emailOrZipCode: 'fakeemail@followingsyntax.com'
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredBillingLastNameErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredBillingLastNameErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');

    });

    test('SCREEN-PLAY: Verify the "Email" field is required to send the guest form.', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'email',
                emailOrZipCode: null
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');

    });

    test('SCREEN-PLAY: Verify the "Email" field requires a valid address when introducing a simple string.', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'email',
                emailOrZipCode: 'simple.string'
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');

    });

    test('SCREEN-PLAY: Verify the "Email" field requires a valid address when using "localpart@".', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'email',
                emailOrZipCode: 'localpart@'
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');

    });

    test('SCREEN-PLAY: Verify the "Email" field requires a valid address when using "localpart@domain-not-dot-com".', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'email',
                emailOrZipCode: 'localpart@domain-not-dot-com'
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredEmailErrorMessage), 'Error message should contain a specific text.').toContainText('Please enter a valid email address (Ex: johndoe@domain.com)');

    });

    test('SCREEN-PLAY: Verify the "Zip Code" field is required to send the guest form.', async ({ page }) => {

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(
            {
                orderID: 'FAKE-ORDER-ID',
                billingLastName: 'Fake Billing Last Name',
                findOrderBy: 'zip',
                emailOrZipCode: null
            }
        ).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [requestTriggered, assertions.isNotTrue],
                [PageElement.considering(OrdersAndReturnsGuestForm.missingRequiredZipCodeErrorMessage), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredZipCodeErrorMessage), 'Error message should contain a specific text.').toContainText('This is a required field.');

    });

    test('SCREEN-PLAY: Verify positive scenario when all infor is correct (by using "Email").', async ({ page }) => {

        const VALID_FORM_DATA_WITH_EMAIL: IRequiredInforForOrdersAndReturnsForm = {
            orderID: '000032042',
            billingLastName: 'New Address 3 - Last Name',
            findOrderBy: 'email',
            emailOrZipCode: 'test.fran@testqafran.com'
        }

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(VALID_FORM_DATA_WITH_EMAIL).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [PageElement.considering('h1.page-title > span.base'), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator('h1.page-title > span.base'), 'Correct order!').toContainText(`Order # ${VALID_FORM_DATA_WITH_EMAIL.orderID}`);

    });

    test('SCREEN-PLAY: Verify positive scenario when all infor is correct (by using "Zip Code").', async ({ page }) => {

        const VALID_FORM_DATA_WITH_ZIP: IRequiredInforForOrdersAndReturnsForm = {
            orderID: '000032042',
            billingLastName: 'New Address 3 - Last Name',
            findOrderBy: 'zip',
            emailOrZipCode: '40000'
        }

        // This is the only Task class I had time to develop following ScrrenPlay pattern.
        await FillFieldsFromOrdersAndReturnsForm.with(VALID_FORM_DATA_WITH_ZIP).performAs(notLoggedMagentaAppUser);

        // Next, a mix of pure Playwright and some Interaction classes.
        let requestTriggered: boolean = false;
        page.on('request', (request) => {
            requestTriggered = true;
        });

        // 2)  This is the other way that exists to execute a Performable Action. It can be read as if the actor is attempting a series of consecutive actions.

        // Besides, there is a speciall class I developed called Ensure, which allows the actor to make assertions about the answers got regarding the state of the system
        // under test, whic are obtained by using the Questions type classes. PageElement is an example.
        // Ensure allows to make assertions about values that do not implemented IQuestion, for instance in this case 'requestTriggered'.

        await notLoggedMagentaAppUser.attemptsTo(
            SimpleClick.on(OrdersAndReturnsGuestForm.continueButon),
            Ensure.that(
                [PageElement.considering('h1.page-title > span.base'), assertions.elementIsVisible]
            )
        );

        // Finally, a regular Playwright assertion.
        //expect(requestTriggered, 'None request should be sent to the server when clicking the "Continue" button').toBe(false);
        // await expect(page.locator(OrdersAndReturnsGuestForm.missingRequiredOrderIdErrorMessage), 'Error message should be visble.').toBeVisible();
        await expect(page.locator('h1.page-title > span.base'), 'Correct order!').toContainText(`Order # ${VALID_FORM_DATA_WITH_ZIP.orderID}`);

    });


});