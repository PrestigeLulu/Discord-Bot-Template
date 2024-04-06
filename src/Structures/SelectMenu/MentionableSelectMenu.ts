import { MentionableSelectMenuInteraction } from 'discord.js'
import Bot from '../../Bot/Bot'

type onInteractType = (
  bot: Bot,
  interaction: MentionableSelectMenuInteraction
) => void

class MentionableSelectMenu {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}

export default MentionableSelectMenu
