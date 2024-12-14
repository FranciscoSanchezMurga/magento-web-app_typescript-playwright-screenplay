import {LocatorTypes, PageControllerTypes} from "../screenplay/generic/models/types/uniformTypesForDifferentFrameworks";

export interface IFunctionalAssertions {
    // Functional assertions over UI
    elementIsVisible(elementLocator: LocatorTypes): Promise<void> | void,
    elementHaveValue(value: string, elementLocator: LocatorTypes): Promise<void> | void,
    // General Functional Assertions
    isTrue(state:boolean): Promise<void> | void,
    isNotTrue(state:boolean): Promise<void> | void,
    isGreaterThanOrEqualTo(limit: number, valueToCompareWithLimit: number): Promise<void> | void
};

// IN DEVELOPING
export interface IVisualAssertions {
    screenshotMatchesBaseline(target: PageControllerTypes | LocatorTypes, options: any): Promise<void> | void
};
