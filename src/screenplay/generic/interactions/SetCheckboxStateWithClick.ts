import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";

export default class SetCheckboxStateWithClick implements IActivity {

    constructor(
        private checkboxSelector: string,
        private checkOrUncheck: boolean
    ) { };

    static byUsing(checkboxSelector: string, checkOrUnchecked: boolean) {
        return new SetCheckboxStateWithClick(checkboxSelector, checkOrUnchecked)
    };

    async performAs(actor: Actor): Promise<void> {
        const isAlreadyChecked = await actor.browsingWebAbility.verifyCheckboxState(this.checkboxSelector);
        if (isAlreadyChecked !== this.checkOrUncheck) {
            await actor.browsingWebAbility.simpleClickOnElement_(this.checkboxSelector)
        }
    }

};