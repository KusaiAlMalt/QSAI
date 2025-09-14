const { divideTeams } = require('../utils/teamDivider.js');

module.exports = {
    name: 'codenames',
    description: 'divides into blue and red team with 1 spymaster each',
    async execute(message, args){
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

        }catch (e){
        message.channel.send(`You took too long, please try again. Error ${e}`);
        }
    }
}