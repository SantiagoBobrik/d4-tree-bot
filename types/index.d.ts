export interface Command {
  data: SlashCommandBuilder;
  execute: (message: Discord.Message) => void;
}
