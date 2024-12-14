import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class SimpleClick implements IActivity {

    constructor(
        public elemenSelector: string
    ) { };

    static on(elementSelector: string) {
        return new SimpleClick(elementSelector)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.simpleClickOnElement_(this.elemenSelector)
    }

};