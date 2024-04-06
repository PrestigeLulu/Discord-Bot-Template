import { UserSelectMenuInteraction } from 'discord.js'
import Bot from '../../Bot/Bot'

type onInteractType = (bot: Bot, interaction: UserSelectMenuInteraction) => void

class UserSelectMenu {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}

export default UserSelectMenu
