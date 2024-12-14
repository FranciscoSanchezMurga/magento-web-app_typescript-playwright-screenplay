"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrdersAndReturnsGuestForm {
    static orderIdInputField = '#oar-order-id';
    static billingLastNameInputField = '#oar-billing-lastname';
    static findOrderByDropdown = '#quick-search-type-id';
    static selectableValueToPickEmailDropdownOption = 'email';
    static selectableValueToPickZipCodeDropdownOption = 'zip';
    static emailTitle = '#oar-email .label';
    static emailInputField = '#oar_email';
    static billingZipCodeTitle = '#oar-zip .label';
    static billingZipCodeInputField = '#oar_zip';
    static missingRequiredOrderIdErrorMessage = '#oar-order-id-error';
    static missingRequiredBillingLastNameErrorMessage = '#oar-billing-lastname-error';
    static missingRequiredEmailErrorMessage = '#oar_email-error';
    static missingRequiredZipCodeErrorMessage = '#oar_zip-error';
    static invalidEmailAddressSyntaxErrorMessage = '#oar_email-error';
    static continueButon = 'button.action.submit.primary';
}
exports.default = OrdersAndReturnsGuestForm;
;
//# sourceMappingURL=ordersAndReturnsUI.js.map