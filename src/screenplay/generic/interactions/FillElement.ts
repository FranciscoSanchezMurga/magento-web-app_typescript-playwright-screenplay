import type Actor from '../Actor';
import IPopulationInteraction from '../models/interfaces/IPopulationInteraction';

export default class FillElement implements IPopulationInteraction {

    constructor(
        public elementSelector: string,
        public value: string
    ) { };

    static considering(elementSelector: string, input: string) {
        return new FillElement(elementSelector, input)
    };

    async performAs(actor: Actor): Promise<void> {
        await actor.browsingWebAbility.fillElement_With_(this.elementSelector, this.value)
    }

};