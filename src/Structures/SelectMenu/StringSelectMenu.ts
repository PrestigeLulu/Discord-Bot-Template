import { StringSelectMenuInteraction } from 'discord.js'
import Bot from '../../Bot/Bot'

type onInteractType = (
  bot: Bot,
  interaction: StringSelectMenuInteraction
) => void

class StringSelectMenu {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}

export default StringSelectMenu
