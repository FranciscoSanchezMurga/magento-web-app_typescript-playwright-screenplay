import Actor from "../../Actor";
import { NonVoid } from "../types/usefulTypes";

export default interface IQuestion<T> {
    answeredBy(actor: Actor): NonVoid<T> | Promise<NonVoid<T>>;
}