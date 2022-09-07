import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import Bot from "./Bot/Bot";

type onInteractType = (bot: Bot, interaction: CommandInteraction) => void | Promise<void>;

export default class SlashCommand {
    constructor(public readonly slashCommand: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, public readonly onInteract: onInteractType) {}
}
