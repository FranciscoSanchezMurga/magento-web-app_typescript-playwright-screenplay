"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertions = void 0;
const test_1 = require("@playwright/test");
class FunctionalAssertionsWithPlaywright {
    constructor() { }
    // UI Functional Assertions
    async elementHaveValue(value, elementLocator) {
        await (0, test_1.expect)(elementLocator).toHaveValue(value);
    }
    async elementIsVisible(elementLocator) {
        await (0, test_1.expect)(elementLocator).toBeVisible();
    }
    // General Functional Assertions
    isTrue(state) {
        (0, test_1.expect)(state).toBe(true);
    }
    isNotTrue(state) {
        (0, test_1.expect)(state).not.toBe(true);
    }
    isGreaterThanOrEqualTo(limit, valueToCompareWithLimit) {
        (0, test_1.expect)(valueToCompareWithLimit).toBeGreaterThanOrEqual(limit);
    }
}
exports.assertions = new FunctionalAssertionsWithPlaywright();
//# sourceMappingURL=AssertionsWithPlaywright.js.map