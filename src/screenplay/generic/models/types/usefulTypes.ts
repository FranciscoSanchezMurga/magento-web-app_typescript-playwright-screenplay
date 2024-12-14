import IQuestion from "../interfaces/IQuestion";

type NonVoid<T> = T extends void | Promise<void> ? never : T;
type AssertableValues<T> = NonVoid<T> | IQuestion<NonVoid<T>>;
type AssertionMethods<T> = (value: NonVoid<T>) => Promise<void> | void;
type AssertableValueAndAssertionPair<T> = [AssertableValues<T>, AssertionMethods<T>];

export {
    NonVoid,
    AssertableValues,
    AssertionMethods,
    AssertableValueAndAssertionPair
};
