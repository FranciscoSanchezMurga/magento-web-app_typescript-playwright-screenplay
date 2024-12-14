import type Actor from "../Actor";
import IActivity from "../models/interfaces/IActivity";
import IPopulationInteraction from "../models/interfaces/IPopulationInteraction";

export default class TypeOnElement implements IPopulationInteraction {

    constructor(
        public elementSelector: string,
        public value: string
    ) { };

    static considering(elementSelector: string, value: string) {
        return new TypeOnElement(elementSelector, value)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.typeValue_OnElement_(this.value, this.elementSelector)
    }

};