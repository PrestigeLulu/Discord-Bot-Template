import { RoleSelectMenuInteraction } from 'discord.js'
import Bot from '../../Bot/Bot'

type onInteractType = (bot: Bot, interaction: RoleSelectMenuInteraction) => void

class RoleSelectMenu {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}

export default RoleSelectMenu
