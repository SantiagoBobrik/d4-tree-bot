import type { Client } from 'discord.js';
export const clientReady = (c: Client): void => {
  if (c.user == null) return;
  console.log(`Ready! Logged in as ${c.user.tag}`);
};
