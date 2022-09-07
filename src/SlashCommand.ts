import {CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";
import Bot from "./Bot/Bot";

type onInteractType = (bot: Bot, interaction: CommandInteraction) => void | Promise<void>;

export default class SlashCommand {
    constructor(public readonly slashCommand: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder, public readonly onInteract: onInteractType) {}
}
