require('dotenv').config();
const { Client, GatewayIntentBits, Collector } = require('discord.js');

//Could be refactored in its own setup step and return the map of the commands with their names, sepereation of concerns
const fs = require('fs');
const path = require('path');

const commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
                        .filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

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