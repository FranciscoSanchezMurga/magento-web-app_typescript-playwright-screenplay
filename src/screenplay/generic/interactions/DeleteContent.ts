import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class DeleteContent implements IActivity {

    constructor(
        public elementSelector: string
    ) { };

    static of(elementSelector: string) {
        return new DeleteContent(elementSelector)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.deleteContentOfElement_(this.elementSelector)
    }

};