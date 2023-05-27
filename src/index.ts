import * as commands from './commands';
import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { clientReady } from './helpers/clientReady';
import { registerCommands } from './helpers/registerCommands';

const TOKEN = process.env.TOKEN as string;
const GUILD_ID = process.env.GUILD_ID as string;

//  Instantiate a new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//  Register the client ready event
client.on(Events.ClientReady, clientReady);

//  Register the interaction create event
client.on(Events.InteractionCreate, async (interaction) => {
  //
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName as keyof typeof commands;

  const command = commands[commandName];

  if (command == null) return;

  console.log(interaction.user.username, interaction.commandName);

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

//  Register the commands
registerCommands(TOKEN, GUILD_ID);

//  Login to the client
client.login(TOKEN);
