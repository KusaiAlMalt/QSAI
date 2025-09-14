require('dotenv').config();

const { Client, GatewayIntentBits, Collector } = require('discord.js');
const { divideTeams } = require('./teamDivider.js');

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

//TODO test command
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

/*client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});*/

client.on('messageCreate', async message => {
  if (message.content === '!codenames'){
    await message.reply(`Provide players' names seperated by a comma (,)`);

    const filter = m => m.author.id === message.author.id;
    try{
      const collected = await message.channel.awaitMessages({
        filter,
        max:1,
        time:15000,
        errors:['time']
      });

      const reply = collected.first();
      const nameList = reply.content.split(',');
      const teams = divideTeams(nameList);
      message.channel.send(`Blue Team: ${teams[0].join(', ')}\nRed Team: ${teams[1].join(', ')}`);

    }catch{
      message.channel.send('You took too long, please try again');
    }
  }
});