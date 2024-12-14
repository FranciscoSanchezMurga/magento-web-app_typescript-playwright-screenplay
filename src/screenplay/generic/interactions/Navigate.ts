import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class Navigate implements IActivity {

    constructor(
        public url: string
    ) { };

    static to(url: string) {
        return new Navigate(url)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.navigateToURL_(this.url)
    }

};