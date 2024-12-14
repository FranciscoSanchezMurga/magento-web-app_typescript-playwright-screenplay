import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class WaitForInvisibility implements IActivity {

    constructor(
        public elementSelector: string
    ) { };

    static of(elementSelector: string) {
        return new WaitForInvisibility(elementSelector)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.waitForHiddennessOfElement_(this.elementSelector)
    }

};