import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class SetCheckboxState implements IActivity {

    constructor(
        private checkboxSelector: string,
        private checkOrUnchecked: boolean,
    ) { };

    static byUsing(checkboxSelector: string, checkOrUnchecked: boolean) {
        return new SetCheckboxState(checkboxSelector, checkOrUnchecked)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.setCheckboxState(this.checkboxSelector, this.checkOrUnchecked)
    }

};