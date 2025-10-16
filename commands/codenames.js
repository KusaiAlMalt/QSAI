const { EmbedBuilder } = require('discord.js');
const { divideIntoGroups, pickRandom } = require('../utils/randomizer.js');

let lastUsedNames = null;

module.exports = {
    name: 'codenames',
    description: 'Divides into blue and red team with 1 spymaster each',
    example: 'Example usage:\n`!codenames Alice Bob Carol Eve`',

    execute(message, args) {
        const names = resolveArgs(args, message, this.example);
        if (!names) return;

        lastUsedNames = names;

        const [blueTeam, redTeam] = divideIntoGroups(names, 2);
        const { spymaster: blueSpymaster, operatives: blueOperatives } = assignRoles(blueTeam);
        const { spymaster: redSpymaster, operatives: redOperatives } = assignRoles(redTeam);

        const embed = buildTeamsEmbed(blueSpymaster, blueOperatives, redSpymaster, redOperatives);

        message.channel.send({ embeds: [embed] });
    }
};

function resolveArgs(args, message, example) {
    if (args.length <= 0) {
        message.reply(`You provided no names. ${example}`);
        return null;
    }

    const command = args[0]?.toLowerCase();

    if (args.length === 1 && command === 'load') {
        if (!lastUsedNames) {
            message.reply(`No names to load yet. Use this command once before trying to load.\n${example}`);
            return null;
        }
        return lastUsedNames;
    }

    //TODO
    if (args.length === 1 && command === 'fetch') {
        message.reply('TODO: implement fetch logic (channel-based player lookup).');
        return null;
    }

    if (args.length < 4) {
        message.reply(`Provide at least four names. ${example}`);
        return null;
    }

    return args;
}

function assignRoles(team) {
    const spymaster = pickRandom(team, 1)[0];
    const operatives = team.filter(member => member !== spymaster);
    return { spymaster, operatives };
}

function buildTeamsEmbed(blueSpymaster, blueOperatives, redSpymaster, redOperatives) {
    return new EmbedBuilder()
        .setColor(0x1abc9c)
        .setTitle('🂠 Codenames Teams')
        .addFields(
            {
                name: '🔴 Red Team',
                value: `👥 **Operatives:**\n${redOperatives.join(' ')}\n\n🕵️ **Spymaster:** ${redSpymaster}`,
                inline: true
            },
            {
                name: '🔵 Blue Team',
                value: `👥 **Operatives:**\n${blueOperatives.join(' ')}\n\n🕵️ **Spymaster:** ${blueSpymaster}`,
                inline: true
            }
        )
        .setFooter({ text: 'Good luck, agents!' })
        .setTimestamp();
}