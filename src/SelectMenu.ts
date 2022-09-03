import { SelectMenuBuilder, SelectMenuInteraction } from "discord.js";
import Bot from "./Bot/Bot";

type onInteractType = (bot: Bot, interaction: SelectMenuInteraction) => Promise<void> | void;

class SelectMenu {
    constructor(public readonly customId: string, public readonly selectBuilder: SelectMenuBuilder, public readonly onInteract: onInteractType) {}
}

export default SelectMenu;
