import {
    LocatorTypes,
    PageControllerTypes,
    PlaywrightLocatorType
} from "../screenplay/generic/models/types/uniformTypesForDifferentFrameworks";
import {expect} from "@playwright/test";
import {IFunctionalAssertions, IVisualAssertions} from "./IAssertions";

class FunctionalAssertionsWithPlaywright implements IFunctionalAssertions {
    constructor() {}

    // UI Functional Assertions

    async elementHaveValue(value: string, elementLocator: PlaywrightLocatorType): Promise<void> {
        await expect(elementLocator).toHaveValue(value);
    }

    async elementIsVisible(elementLocator: PlaywrightLocatorType): Promise<void> {
        await expect(elementLocator).toBeVisible()
    }

    // General Functional Assertions

    isTrue(state:boolean): void {
        expect(state).toBe(true)
    }

    isNotTrue(state: boolean): Promise<void> | void {
        expect(state).not.toBe(true)
    }

    isGreaterThanOrEqualTo(limit: number, valueToCompareWithLimit: number): void {
        expect(valueToCompareWithLimit).toBeGreaterThanOrEqual(limit)
    }

}

export const assertions = new FunctionalAssertionsWithPlaywright();