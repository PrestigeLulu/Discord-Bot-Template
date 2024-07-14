import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import Bot from '../Bot/Bot'

type onInteractType = (
  bot: Bot,
  interaction: ChatInputCommandInteraction,
) => void

export default class SlashCommand {
  constructor(
    public readonly slashCommand:
      | SlashCommandOptionsOnlyBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>,
    public readonly onInteract: onInteractType,
  ) {}
}
