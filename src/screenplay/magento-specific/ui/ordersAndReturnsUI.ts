export default class OrdersAndReturnsGuestForm {
    static orderIdInputField: string = '#oar-order-id';
    static billingLastNameInputField: string = '#oar-billing-lastname';
    static findOrderByDropdown: string = '#quick-search-type-id';
    static selectableValueToPickEmailDropdownOption: 'email' = 'email';
    static selectableValueToPickZipCodeDropdownOption: 'zip' = 'zip';
    static emailTitle: string = '#oar-email .label';
    static emailInputField: string = '#oar_email';
    static billingZipCodeTitle: string = '#oar-zip .label';
    static billingZipCodeInputField: string = '#oar_zip';
    static missingRequiredOrderIdErrorMessage: string = '#oar-order-id-error';
    static missingRequiredBillingLastNameErrorMessage: string = '#oar-billing-lastname-error';
    static missingRequiredEmailErrorMessage: string = '#oar_email-error';
    static missingRequiredZipCodeErrorMessage: string = '#oar_zip-error';
    static invalidEmailAddressSyntaxErrorMessage: string = '#oar_email-error';
    static continueButon: string = 'button.action.submit.primary'
};