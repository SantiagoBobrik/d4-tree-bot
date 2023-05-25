import { type ChatInputCommandInteraction } from 'discord.js';

import type { Command } from '../../types';

export const share: Command = {
  name: 'share',
  description: 'Share the bot with your friends!',
  execute(message: ChatInputCommandInteraction) {
    message.reply('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  },
};
