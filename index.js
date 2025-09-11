require('dotenv').config();

const { Client, GatewayIntentBits, Collector } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
    ],
});

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.on('messageCreate', async message => {
  if (message.content === '!codenames'){
    await message.reply('Provide player names seperated by a comma (,)');

    const filter = m => m.author.id === message.author.id;
    try{
      const collected = await message.channel.awaitMessages({
        filter,
        max:1,
        time:15000,
        errors:['time']
      });

      const reply = collected.first();
      message.channel.send(`Names provided: ${reply.content}`);

    }catch{
      message.channel.send('You ass too slow');
    }
  }
});