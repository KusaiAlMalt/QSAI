require('dotenv').config();
const { loadCommands } = require('./utils/commandLoader');

const { Client, GatewayIntentBits, Collector } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
    ],
});

client.login(process.env.DISCORD_TOKEN);

client.once('clientReady', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

const commands = loadCommands();
const PREFIX = '!'

client.on('messageCreate', message =>{
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);
  if(!command) return;
  
  try{
    command.execute(message, args);
  }catch (error) {
    console.error(error);
    message.reply('Error Executing Command');
  }
});