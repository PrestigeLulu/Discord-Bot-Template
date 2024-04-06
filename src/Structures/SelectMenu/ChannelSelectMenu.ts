import { ChannelSelectMenuInteraction } from 'discord.js'
import Bot from '../../Bot/Bot'

type onInteractType = (
  bot: Bot,
  interaction: ChannelSelectMenuInteraction
) => void

class ChannelSelectMenu {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}

export default ChannelSelectMenu
