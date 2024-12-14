import type Actor from '../Actor';
import IPopulationInteraction from '../models/interfaces/IPopulationInteraction';

export default class SelectOptionFromDropdown implements IPopulationInteraction {

    constructor(
        public elementSelector: string,
        public value: string,
    ) { };

    static considering(dropdownSelector: string, dropdownOption: string) {
        return new SelectOptionFromDropdown(dropdownSelector,dropdownOption)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.selectFromDropdown_TheOption_( this.elementSelector, this.value)
    }

};