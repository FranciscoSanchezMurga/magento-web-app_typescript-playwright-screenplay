import { PageControllerTypes, LocatorTypes } from '../types/uniformTypesForDifferentFrameworks'

export default interface IBrowsingWebAbility {
    pageController: PageControllerTypes,
    locateElement(elementSelector: string): LocatorTypes,
    simpleClickOnElement_(elementSelector: string): Promise<void>,
    navigateToURL_(url: string): Promise<void>,
    waitForVisibilityOfElement_(elementSelector: string): Promise<void>,
    waitForHiddennessOfElement_(elementSelector: string): Promise<void>,
    deleteContentOfElement_(elementSelector: string): Promise<void>,
    // The main difference between the following two methods is that the first one simulates keyboard typing,
    // as a human user would. This is important because it triggers key events that some element methods rely on
    typeValue_OnElement_(inputValue: string,elementSelector: string): Promise<void>,
    fillElement_With_(elementSelector: string, input: string): Promise<void>,
    selectFromDropdown_TheOption_(elementSelector: string ,dropdownOption: string): Promise<void>,
    checkVisibilityOfElement_(elementSelector: string): Promise<boolean>,
    countLocatedElements(elementsSelector: string): Promise<number>,
    // Locates and returns the element at the specified zero-based index from a set of elements that match the provided selector.
    // If the index is negative or exceeds the number of available elements, or if there is no element matching the selector, then the method returns null.
    locateNthIndexedElement(elementsSelector: string, index: number, ): Promise<LocatorTypes>,
    checkAttributeValueFromElement(attributeName: string, value: string, elementSelector: string): Promise<boolean>,
    verifyCheckboxState(checkboxSelector: string): Promise<boolean>,
    // The next method should work for both checkbox and radio elements, ensuring their state is changed only if it's not already correctly set.
    // Disadvantage: It doesn't trigger events such as key events, similar to the behavior difference between fill() and type().
    setCheckboxState(checkboxSelector: string, checkOrUncheck: boolean): Promise<void>
}