import { REST, Routes } from 'discord.js';
import * as commands from '../commands';
export const registerCommands = async (
  token: string,
  guildId: string
): Promise<void> => {
  //

  const commandsArray = Object.values(commands).map((command) => ({
    name: command.name,
    description: command.description,
  }));

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(guildId), {
      body: commandsArray,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};
