import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js';

import type { Command } from '../../types';
import { diabloClasses } from '../helpers/diabloClasses';

const commandData = new SlashCommandBuilder()
  .setName('share')
  .setDescription('Comparte tu build!')
  .addStringOption((option) =>
    option
      .setName('url')
      .setDescription('Url de https://d4tree.io/')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('clase')
      .setDescription('Clase de la build')
      .setRequired(true)
      .addChoices(
        {
          name: diabloClasses.barbarian.name,
          value: diabloClasses.barbarian.id.toString(),
        },
        {
          name: diabloClasses.druid.name,
          value: diabloClasses.druid.id.toString(),
        },
        {
          name: diabloClasses.necromancer.name,
          value: diabloClasses.necromancer.id.toString(),
        },
        {
          name: diabloClasses.rogue.name,
          value: diabloClasses.rogue.id.toString(),
        },
        {
          name: diabloClasses.sorcerer.name,
          value: diabloClasses.sorcerer.id.toString(),
        }
      )
  )
  .addStringOption((option) =>
    option.setName('tipo').setDescription('Tipo de build').setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('descripcion')
      .setDescription('Breve descripcion de lo que se trata la build')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('imagen')
      .setDescription('Url de una imagen que quieras agregar')
      .setRequired(false)
  );

export const share: Command = {
  data: commandData,
  execute(message: ChatInputCommandInteraction) {
    const user = message.user;
    const url = message.options.getString('url');
    const classId = message.options.getString('clase');
    const descripcion = message.options.getString('descripcion') as string;
    const tipo = message.options.getString('tipo') as string;
    const imageFooter = message.options.getString('imagen');
    const classSelected = Object.values(diabloClasses).find(
      (c) => c.id === Number(classId)
    );

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x640000)
      .setTitle(`Build ${classSelected?.name ?? ''} ${tipo}`)
      .setAuthor({
        name: user.username,
        iconURL: message.user.displayAvatarURL(),
      })
      .setDescription(descripcion)
      .setThumbnail(classSelected?.image ?? '')
      .setTimestamp()
      .setFooter({
        text: 'Recuerda que puedes compartir tu build con el comando /share',
      });

    if (imageFooter !== null) {
      exampleEmbed.setImage(imageFooter);
    }

    if (url?.includes('d4tree') ?? false) {
      exampleEmbed.setURL(url);
      exampleEmbed.addFields(
        { name: 'Url:', value: url ?? '' },
        { name: '\u200B', value: '\u200B' }
      );
    }

    message.reply({ embeds: [exampleEmbed] });
  },
};
