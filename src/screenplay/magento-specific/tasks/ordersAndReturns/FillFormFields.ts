import Actor from "../../../generic/Actor"
import FillElement from "../../../generic/interactions/FillElement";
import IActivity from "../../../generic/models/interfaces/IActivity";
import OrdersAndReturnsGuestForm from "../../ui/ordersAndReturnsUI";
import IPopulationInteraction from "../../../generic/models/interfaces/IPopulationInteraction";
import SelectOptionFromDropdown from "../../../generic/interactions/SelectOptionFromDropdown";
import IRequiredInforForOrdersAndReturnsForm from "../../models/IRequiredInforForOrdersAndReturnsFrom";

export default class FillFieldsFromOrdersAndReturnsForm implements IActivity {
    private constructor(
        private fillOrderIDField: IPopulationInteraction,
        private fillBillingLastNameField: IPopulationInteraction,
        private selectHowToFindOrder: IPopulationInteraction,
        private fillEmailField: IPopulationInteraction,
        private fillZipCodeField: IPopulationInteraction,
        private INFOR_FOR_ORDERS_AND_RETURNS_FORM: IRequiredInforForOrdersAndReturnsForm,
        private FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES: [
            typeof OrdersAndReturnsGuestForm.selectableValueToPickEmailDropdownOption,
            typeof OrdersAndReturnsGuestForm.selectableValueToPickZipCodeDropdownOption
        ]
    ) { };

    static with(inforForOrdersAndReturnsForm: IRequiredInforForOrdersAndReturnsForm): FillFieldsFromOrdersAndReturnsForm {
        return new FillFieldsFromOrdersAndReturnsForm(
            FillElement.considering(OrdersAndReturnsGuestForm.orderIdInputField, inforForOrdersAndReturnsForm.orderID),
            FillElement.considering(OrdersAndReturnsGuestForm.billingLastNameInputField, inforForOrdersAndReturnsForm.billingLastName),
            SelectOptionFromDropdown.considering(OrdersAndReturnsGuestForm.findOrderByDropdown, inforForOrdersAndReturnsForm.findOrderBy),
            FillElement.considering(OrdersAndReturnsGuestForm.emailInputField, inforForOrdersAndReturnsForm.emailOrZipCode),
            FillElement.considering(OrdersAndReturnsGuestForm.billingZipCodeInputField, inforForOrdersAndReturnsForm.emailOrZipCode),
            inforForOrdersAndReturnsForm,
            [
                OrdersAndReturnsGuestForm.selectableValueToPickEmailDropdownOption,
                OrdersAndReturnsGuestForm.selectableValueToPickZipCodeDropdownOption
            ]
        )
    }

    async performAs(actor: Actor): Promise<void> {
        if (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.orderID != null) {
            await this.fillOrderIDField.performAs(actor)
        };
        if (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.billingLastName != null) {
            await this.fillBillingLastNameField.performAs(actor)
        }
        await this.selectHowToFindOrder.performAs(actor);
        if(this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.emailOrZipCode != null) {
            switch (this.INFOR_FOR_ORDERS_AND_RETURNS_FORM.findOrderBy) {
                case this.FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES[0]: {
                    await this.fillEmailField.performAs(actor)
                    break;
                }
                case this.FIND_BY_ORDER_DROPDOWN_POSSIBLE_VALUES[1]: {
                    await this.fillZipCodeField.performAs(actor)
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
}