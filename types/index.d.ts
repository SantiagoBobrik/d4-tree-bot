export interface Command {
  name: string;
  description: string;
  execute: (message: Discord.Message) => void;
}
