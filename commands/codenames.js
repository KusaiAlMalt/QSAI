const { EmbedBuilder } = require('discord.js');
const { divideIntoTwoTeams } = require('../utils/teamDivider.js');

let lastUsedNames = null;

module.exports = {
    name: 'codenames',
    description: 'divides into blue and red team with 1 spymaster each',
    example: 'Example of how to use the command:\n`!codenames Alice Bob Carol Eve`',
    execute(message, args) {
        if (args.length <= 0) {
            message.reply(`You provided no names. ${this.example}`)
            return;
        }
        if (args.length === 1 && args[0].toLowerCase() === 'load') {
            if(!lastUsedNames){
                message.reply(`No names to load, use this command at least once before trying to load\n${this.example}`);
                return;
            }
        }
        if (args.length < 4) {
            message.reply(`Provide at least four names. ${this.example}`)
            return;
        }
        lastUsedNames = args;

        const [blueTeam, redTeam] = divideIntoTwoTeams(args);

        const [[blueSpymaster], blueOperatives] = pickSpymasterAndOperative(blueTeam);
        const [[redSpymaster], redOperatives] = pickSpymasterAndOperative(redTeam);

        // build embed
        const embed = new EmbedBuilder()
            .setColor(0x1abc9c)
            .setTitle('🂠 Codenames Teams')
            .addFields(
                {
                    name: '🔴 Red Team',
                    value: `👥 **Operatives:** \n${redOperatives.join(' ')}\n\n🕵️ **Spymaster:** \n${redSpymaster}`,
                    inline: true
                },
                {
                    name: '🔵 Blue Team',
                    value: `👥 **Operatives:** \n${blueOperatives.join(' ')}\n\n🕵️ **Spymaster:** \n${blueSpymaster}`,
                    inline: true
                }
            )
            .setFooter({ text: 'Good luck agents!' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
}

function pickSpymasterAndOperative(teamNames) {
    const spyIndex = Math.floor(Math.random() * teamNames.length);
    const spymaster = teamNames[spyIndex];
    const operatives = teamNames.filter((_, i) => i !== spyIndex);

    return [[spymaster], operatives];
}
