import Bot from './Bot'
import { readdirSync } from 'fs'
import {
  ApplicationCommandDataResolvable,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  Collection,
  ContextMenuCommandInteraction,
  Interaction,
  MentionableSelectMenuInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from 'discord.js'
import Button from '../Structures/Button'
import SlashCommand from '../Structures/SlashCommand'
import Modal from '../Structures/Modal'
import Event from '../Structures/Event'
import ContextMenuCommand from '../Structures/ContextMenuCommand'
import ChannelSelectMenu from '../Structures/SelectMenu/ChannelSelectMenu'
import MentionableSelectMenu from '../Structures/SelectMenu/MentionableSelectMenu'
import RoleSelectMenu from '../Structures/SelectMenu/RoleSelectMenu'
import StringSelectMenu from '../Structures/SelectMenu/StringSelectMenu'
import UserSelectMenu from '../Structures/SelectMenu/UserSelectMenu'

const slashCommands = new Collection<string, SlashCommand>()
const contextMenuCommands = new Collection<string, ContextMenuCommand>()
const buttons = new Collection<string, Button>()
const modals = new Collection<string, Modal>()
const channelSelectMenus = new Collection<string, ChannelSelectMenu>()
const menctionableSelectMenus = new Collection<string, MentionableSelectMenu>()
const roleSelectMenus = new Collection<string, RoleSelectMenu>()
const stringSelectMenus = new Collection<string, StringSelectMenu>()
const userSelectMenus = new Collection<string, UserSelectMenu>()

export default function Initialize(bot: Bot): void {
  bot.on(
    'interactionCreate',
    async (interaction: Interaction): Promise<void> => {
      if (interaction instanceof ChatInputCommandInteraction) {
        const slashCommand: SlashCommand | undefined = slashCommands.get(
          interaction.commandName,
        )
        if (slashCommand === undefined) return
        slashCommand.onInteract(bot, interaction)
      } else if (interaction instanceof ContextMenuCommandInteraction) {
        const contextMenuCommand: ContextMenuCommand | undefined =
          contextMenuCommands.get(interaction.commandName)
        if (contextMenuCommand === undefined) return
        contextMenuCommand.onInteract(bot, interaction)
      } else if (interaction instanceof ButtonInteraction) {
        const button: Button | undefined = buttons.get(interaction.customId)
        if (button === undefined) return
        button.onInteract(bot, interaction)
      } else if (interaction instanceof ModalSubmitInteraction) {
        const modal: Modal | undefined = modals.get(interaction.customId)
        if (modal === undefined) return
        modal.onInteract(bot, interaction)
      } else if (interaction instanceof ChannelSelectMenuInteraction) {
        const selectMenu: ChannelSelectMenu | undefined =
          channelSelectMenus.get(interaction.customId)
        if (selectMenu === undefined) return
        selectMenu.onInteract(bot, interaction)
      } else if (interaction instanceof MentionableSelectMenuInteraction) {
        const selectMenu: MentionableSelectMenu | undefined =
          menctionableSelectMenus.get(interaction.customId)
        if (selectMenu === undefined) return
        selectMenu.onInteract(bot, interaction)
      } else if (interaction instanceof RoleSelectMenuInteraction) {
        const selectMenu: RoleSelectMenu | undefined = roleSelectMenus.get(
          interaction.customId,
        )
        if (selectMenu === undefined) return
        selectMenu.onInteract(bot, interaction)
      } else if (interaction instanceof StringSelectMenuInteraction) {
        const selectMenu: StringSelectMenu | undefined = stringSelectMenus.get(
          interaction.customId,
        )
        if (selectMenu === undefined) return
        selectMenu.onInteract(bot, interaction)
      } else if (interaction instanceof UserSelectMenuInteraction) {
        const selectMenu: UserSelectMenu | undefined = userSelectMenus.get(
          interaction.customId,
        )
        if (selectMenu === undefined) return
        selectMenu.onInteract(bot, interaction)
      }
    },
  )
  const commandData: ApplicationCommandDataResolvable[] = []
  bot.on('ready', () => {
    bot.application?.commands.cache.clear()
    bot.application?.commands.set(commandData)
  })
  readdirSync('./src/Functions')
    .filter((folderName) => !folderName.endsWith('.ts'))
    .forEach((folderName) => {
      readdirSync(`./src/Functions/${folderName}`)
        .filter((fileName) => fileName.endsWith('.ts'))
        .forEach((fileName) => {
          const file:
            | Button
            | SlashCommand
            | Modal
            | Event
            | ChannelSelectMenu
            | MentionableSelectMenu
            | RoleSelectMenu
            | StringSelectMenu
            | UserSelectMenu = require(
            `../Functions/${folderName}/${fileName}`,
          ).default
          if (file instanceof Event) {
            bot.on(file.eventName, (...args) => file.onCall(bot, ...args))
          } else if (file instanceof SlashCommand) {
            slashCommands.set(file.slashCommand.name, file)
            commandData.push(file.slashCommand.toJSON())
          } else if (file instanceof ContextMenuCommand) {
            contextMenuCommands.set(file.contextMenuCommand.name, file)
            commandData.push(file.contextMenuCommand.toJSON())
          } else if (file instanceof Button) {
            buttons.set(file.customId, file)
          } else if (file instanceof Modal) {
            modals.set(file.customId, file)
          } else if (file instanceof ChannelSelectMenu) {
            channelSelectMenus.set(file.customId, file)
          } else if (file instanceof MentionableSelectMenu) {
            menctionableSelectMenus.set(file.customId, file)
          } else if (file instanceof RoleSelectMenu) {
            roleSelectMenus.set(file.customId, file)
          } else if (file instanceof StringSelectMenu) {
            stringSelectMenus.set(file.customId, file)
          } else if (file instanceof UserSelectMenu) {
            userSelectMenus.set(file.customId, file)
          }
        })
    })
}
