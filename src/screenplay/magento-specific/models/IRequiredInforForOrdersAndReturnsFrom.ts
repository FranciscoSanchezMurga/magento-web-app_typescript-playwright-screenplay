import OrdersAndReturnsGuestForm from "../ui/ordersAndReturnsUI"

export default interface IRequiredInforForOrdersAndReturnsForm {
    orderID: null | string,
    billingLastName: null | string,
    findOrderBy: typeof OrdersAndReturnsGuestForm.selectableValueToPickEmailDropdownOption | typeof OrdersAndReturnsGuestForm.selectableValueToPickZipCodeDropdownOption | null,
    emailOrZipCode: string | null
}