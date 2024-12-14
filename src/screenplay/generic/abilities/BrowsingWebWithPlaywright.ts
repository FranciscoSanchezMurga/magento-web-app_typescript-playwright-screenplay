import { PlaywrightPageControllerType, PlaywrightLocatorType } from "../models/types/uniformTypesForDifferentFrameworks";
import IBrowsingWebAbility from "../models/interfaces/iBrowsingWebAbility"

export default class BrowsingWebWithPlaywright implements IBrowsingWebAbility {

    constructor(
        public pageController: PlaywrightPageControllerType
    ) { };

    static generateForUsageWith(pageController: PlaywrightPageControllerType): BrowsingWebWithPlaywright {
        return new BrowsingWebWithPlaywright(pageController)
    };

    locateElement(elementSelector: string): PlaywrightLocatorType {
        return this.pageController.locator(elementSelector)
    };

    async simpleClickOnElement_(elementSelector: string): Promise<void> {
        await this.locateElement(elementSelector).click();
    };

    async navigateToURL_(url: string): Promise<void> {
        await this.pageController.goto(url)
    };

    async waitForVisibilityOfElement_(elementSelector: string): Promise<void> {
        await this.locateElement(elementSelector).waitFor()
    };

    async waitForHiddennessOfElement_(elementSelector: string): Promise<void> {
        await this.locateElement(elementSelector).waitFor({ state: 'hidden' })
    };

    async deleteContentOfElement_(elementSelector: string): Promise<void> {
        const locator = this.locateElement(elementSelector);
        await locator.press('Control+A');
        await locator.press('Backspace')
    };

    async typeValue_OnElement_(inputValue: string,elementSelector: string): Promise<void> {
        await this.locateElement(elementSelector).pressSequentially(inputValue, { delay: 50 })
    };

    async fillElement_With_(elementSelector: string, inputValue: string) {
        await this.locateElement(elementSelector).fill(inputValue)
    };

    async selectFromDropdown_TheOption_(elementSelector: string ,dropdownOption: string): Promise<void> {
        await this.locateElement(elementSelector).selectOption(dropdownOption)
    };

    async checkVisibilityOfElement_(elementSelector: string): Promise<boolean> {
        return await this.locateElement(elementSelector).isVisible()
    };

    async countLocatedElements(elementsSelector: string): Promise<number> {
        return await this.locateElement(elementsSelector).count();
    };

    async locateNthIndexedElement(elementsSelector: string, index: number): Promise<PlaywrightLocatorType | null> {
        return this.locateElement(elementsSelector).nth(index)
    }

    async checkAttributeValueFromElement(attributeName: string, value: string, elementSelector: string): Promise<boolean> {
        const element: PlaywrightLocatorType = this.locateElement(elementSelector);
        const attributeData = {attributeName, value};
        return await element.evaluate((element, attributeData) => {
            const attributeContent = element.getAttribute(attributeData.attributeName);
            if(attributeContent === null || attributeContent === '') {
                return false
            }
            switch (attributeData.attributeName) {
                case 'class':
                    return attributeContent?.split(' ').includes(attributeData.value) ?? false
                default:
                    return (attributeContent === attributeData.value)
            }
        }, attributeData)
    };

    async verifyCheckboxState(checkboxSelector: string): Promise<boolean> {
        return this.locateElement(checkboxSelector).isChecked()
    }

    async setCheckboxState(checkboxSelector: string, checkOrUncheck: boolean): Promise<void> {
        await this.locateElement(checkboxSelector).setChecked(checkOrUncheck,)
    }

};