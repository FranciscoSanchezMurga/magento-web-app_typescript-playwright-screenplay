"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FillElement_1 = __importDefault(require("../../../generic/interactions/FillElement"));
const ordersAndReturnsUI_1 = __importDefault(require("../../ui/ordersAndReturnsUI"));
const SelectOptionFromDropdown_1 = __importDefault(require("../../../generic/interactions/SelectOptionFromDropdown"));
class FillFieldsFromOrdersAndReturnsForm {
    fillOrderIDField;
    fillBillingLastNameField;
    selectHowToFindOrder;
    fillEmailField;
    fillZipCodeField;
    INFOR_FOR_ORDERS_AND_RETURNS_FORM;
    FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES;
    constructor(fillOrderIDField, fillBillingLastNameField, selectHowToFindOrder, fillEmailField, fillZipCodeField, INFOR_FOR_ORDERS_AND_RETURNS_FORM, FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES) {
        this.fillOrderIDField = fillOrderIDField;
        this.fillBillingLastNameField = fillBillingLastNameField;
        this.selectHowToFindOrder = selectHowToFindOrder;
        this.fillEmailField = fillEmailField;
        this.fillZipCodeField = fillZipCodeField;
        this.INFOR_FOR_ORDERS_AND_RETURNS_FORM = INFOR_FOR_ORDERS_AND_RETURNS_FORM;
        this.FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES = FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES;
    }
    ;
    static with(inforForOrdersAndReturnsForm) {
        return new FillFieldsFromOrdersAndReturnsForm(FillElement_1.default.considering(ordersAndReturnsUI_1.default.orderIdInputField, inforForOrdersAndReturnsForm.orderID), FillElement_1.default.considering(ordersAndReturnsUI_1.default.billingLastNameInputField, inforForOrdersAndReturnsForm.billingLastName), SelectOptionFromDropdown_1.default.considering(ordersAndReturnsUI_1.default.findOrderByDropdown, inforForOrdersAndReturnsForm.findOrderBy), FillElement_1.default.considering(ordersAndReturnsUI_1.default.emailInputField, inforForOrdersAndReturnsForm.emailOrZipCode), FillElement_1.default.considering(ordersAndReturnsUI_1.default.billingZipCodeInputField, inforForOrdersAndReturnsForm.emailOrZipCode), inforForOrdersAndReturnsForm, [
            ordersAndReturnsUI_1.default.selectableValueToPickEmailDropdownOption,
            ordersAndReturnsUI_1.default.selectableValueToPickZipCodeDropdownOption
        ]);
    }
    async performAs(actor) {
        if (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.orderID != null) {
            await this.fillOrderIDField.performAs(actor);
        }
        ;
        if (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.billingLastName != null) {
            await this.fillBillingLastNameField.performAs(actor);
        }
        await this.selectHowToFindOrder.performAs(actor);
        if (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.emailOrZipCode != null) {
            switch (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.findOrderBy) {
                case this.FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES[0]: {
                    await this.fillEmailField.performAs(actor);
                    break;
                }
                case this.FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES[1]: {
                    await this.fillZipCodeField.performAs(actor);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
}
exports.default = FillFieldsFromOrdersAndReturnsForm;
//# sourceMappingURL=FillFormFields.js.map