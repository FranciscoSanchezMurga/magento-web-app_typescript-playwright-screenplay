import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class WaiTForVisibility implements IActivity {

    constructor(
        public elementSelector: string
    ) { };

    static of(elementSelector: string) {
        return new WaiTForVisibility(elementSelector)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.waitForVisibilityOfElement_(this.elementSelector)
    }

};