import Actor from "../../Actor"

export default interface IActivity {
    performAs(actor: Actor): Promise<void> | void;
};