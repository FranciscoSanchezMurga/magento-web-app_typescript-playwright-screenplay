"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrowsingWebWithPlaywright {
    pageController;
    constructor(pageController) {
        this.pageController = pageController;
    }
    ;
    static generateForUsageWith(pageController) {
        return new BrowsingWebWithPlaywright(pageController);
    }
    ;
    locateElement(elementSelector) {
        return this.pageController.locator(elementSelector);
    }
    ;
    async simpleClickOnElement_(elementSelector) {
        await this.locateElement(elementSelector).click();
    }
    ;
    async navigateToURL_(url) {
        await this.pageController.goto(url);
    }
    ;
    async waitForVisibilityOfElement_(elementSelector) {
        await this.locateElement(elementSelector).waitFor();
    }
    ;
    async waitForHiddennessOfElement_(elementSelector) {
        await this.locateElement(elementSelector).waitFor({ state: 'hidden' });
    }
    ;
    async deleteContentOfElement_(elementSelector) {
        const locator = this.locateElement(elementSelector);
        await locator.press('Control+A');
        await locator.press('Backspace');
    }
    ;
    async typeValue_OnElement_(inputValue, elementSelector) {
        await this.locateElement(elementSelector).pressSequentially(inputValue, { delay: 50 });
    }
    ;
    async fillElement_With_(elementSelector, inputValue) {
        await this.locateElement(elementSelector).fill(inputValue);
    }
    ;
    async selectFromDropdown_TheOption_(elementSelector, dropdownOption) {
        await this.locateElement(elementSelector).selectOption(dropdownOption);
    }
    ;
    async checkVisibilityOfElement_(elementSelector) {
        return await this.locateElement(elementSelector).isVisible();
    }
    ;
    async countLocatedElements(elementsSelector) {
        return await this.locateElement(elementsSelector).count();
    }
    ;
    async locateNthIndexedElement(elementsSelector, index) {
        return this.locateElement(elementsSelector).nth(index);
    }
    async checkAttributeValueFromElement(attributeName, value, elementSelector) {
        const element = this.locateElement(elementSelector);
        const attributeData = { attributeName, value };
        return await element.evaluate((element, attributeData) => {
            const attributeContent = element.getAttribute(attributeData.attributeName);
            if (attributeContent === null || attributeContent === '') {
                return false;
            }
            switch (attributeData.attributeName) {
                case 'class':
                    return attributeContent?.split(' ').includes(attributeData.value) ?? false;
                default:
                    return (attributeContent === attributeData.value);
            }
        }, attributeData);
    }
    ;
    async verifyCheckboxState(checkboxSelector) {
        return this.locateElement(checkboxSelector).isChecked();
    }
    async setCheckboxState(checkboxSelector, checkOrUncheck) {
        await this.locateElement(checkboxSelector).setChecked(checkOrUncheck);
    }
}
exports.default = BrowsingWebWithPlaywright;
;
//# sourceMappingURL=BrowsingWebWithPlaywright.js.map