import Bot from '../Bot/Bot'
import { ModalSubmitInteraction } from 'discord.js'

type onInteractType = (bot: Bot, interaction: ModalSubmitInteraction) => void

export default class Modal {
  constructor(
    public readonly customId: string,
    public readonly onInteract: onInteractType
  ) {}
}
