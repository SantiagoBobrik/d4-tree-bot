import {
  type ChatInputCommandInteraction,
  bold,
  SlashCommandBuilder,
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
          value: diabloClasses.barbarian.emoji,
        },
        { name: diabloClasses.druid.name, value: diabloClasses.druid.emoji },
        {
          name: diabloClasses.necromancer.name,
          value: diabloClasses.necromancer.emoji,
        },
        { name: diabloClasses.rogue.name, value: diabloClasses.rogue.emoji },
        {
          name: diabloClasses.sorcerer.name,
          value: diabloClasses.sorcerer.emoji,
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
  );

export const share: Command = {
  data: commandData,
  execute(message: ChatInputCommandInteraction) {
    const user = message.user;
    const url = message.options.getString('url') as string;
    const clase = message.options.getString('clase') as string;
    const descripcion = message.options.getString('descripcion') as string;
    const tipo = message.options.getString('tipo') as string;
    const className =
      Object.values(diabloClasses).find((c) => c.emoji === clase)?.name ?? '';
    const emoji = message.guild?.emojis.cache.find(
      (emoji) => emoji.name === clase
    );
    const emojiString = emoji?.toString() ?? '';

    const title = `Nueva build para ${className} ${emojiString} ${tipo}`;
    const messageFormated = `

    == ${bold('Autor')} ==
     ${user.toString()}

    == ${bold('Descripcion')} ==
    ${descripcion}

    == ${bold('Url')} ==
    ${url}
    
    `;

    const embed = {
      color: 0x640000,
      title,
      description: messageFormated,
    };

    message.reply({ embeds: [embed] });
  },
};
