import IActivity from "./IActivity";

export default interface IPopulationInteraction extends IActivity{
    elementSelector: string,
    value: string
}