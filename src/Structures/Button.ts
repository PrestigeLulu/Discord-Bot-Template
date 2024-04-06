import Bot from '../Bot/Bot'
import { ButtonInteraction } from 'discord.js'

type onInteractType = (bot: Bot, interaction: ButtonInteraction) => void

export default class Button {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType,
  ) {}
}
