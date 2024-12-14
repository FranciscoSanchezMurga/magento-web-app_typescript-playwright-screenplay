// -- PLAYWRIGHT TYPES --

import type { Page as PlaywrightPageControllerType, Locator as PlaywrightLocatorType} from '@playwright/test';

/* -- GENERIC TYPES --

The following types are intended to be utilized by generic interfaces and higher-level abstraction classes.
This design ensures that if there's a need to switch to a different framework in the future, the existing interfaces 
and classes won't require modifications. 
Instead, it will suffice to update these generic types to incorporate the types of the new framework alongside the 
current ones.

Example:
    For Cypress, PageControllerTypes could include the 'cy' object, like this:
    const CypressPageControllerType = cy;
    type PageControllerTypes = PlaywrightPageControllerType | CypressPageControllerType;

*/

type PageControllerTypes = PlaywrightPageControllerType;
type LocatorTypes = PlaywrightLocatorType;

// -- EXPORT TYPES --

export {
    PlaywrightPageControllerType,
    PageControllerTypes,
    LocatorTypes,
    PlaywrightLocatorType
}