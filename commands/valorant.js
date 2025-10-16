const { pickRandom, divideIntoGroups } = require('../utils/randomizer.js');

const agents = [
  "Brimstone",
  "Phoenix",
  "Sage",
  "Sova",
  "Gekko",
  "Viper",
  "Cypher",
  "Tejo",
  "Reyna",
  "Killjoy",
  "Breach",
  "Omen",
  "Jett",
  "Raze",
  "Skye",
  "Yoru",
  "Astra",
  "KAY/O",
  "Chamber",
  "Neon",
  "Harbor",
  "Fade",
  "Deadlock",
  "Iso",
  "Clove",
  "Veto"
];
const maps = [
  "Abyss",
  "Ascent",
  "Bind",
  "Breeze",
  "Corrode",
  "Fracture",
  "Haven",
  "Icebox",
  "Lotus",
  "Pearl",
  "Split",
  "Sunset",
];

module.exports = {
    name: 'valorant',
    description: 'Handles Valorant-related randomizations such as agent, map, or team composition.',
    example: [
        'Example usage:',
        '`!valorant agent` → Picks a random agent',
        '`!valorant map` → Picks a random map',
        '`!valorant custom Alice Bob Eve Charlie` → Random map + two teams'
    ].join('\n'),

    execute(message, args) {
        if (args.length === 0) {
            message.reply(`You must provide a subcommand. ${this.example}`);
            return;
        }

        const subcommand = args[0].toLowerCase();

        switch (subcommand) {
            case 'agent':
                return handleAgent(message);
            case 'map':
                return handleMap(message);
            case 'custom':
                return handleCustom(message, args.slice(1));
            default:
                message.reply(`Unknown subcommand \`${subcommand}\`.\n${this.example}`);
        }
    }
};

function handleAgent(message) {
    const agent = pickRandom(agents, 1)[0];
    message.reply(`Your random agent is **${agent}**!`);
}

function handleMap(message) {
    const map = pickRandom(maps, 1)[0];
    message.reply(`The selected map is **${map}**!`);
}

function handleCustom(message, playerNames) {
    if (playerNames.length < 2) {
        message.reply('You must provide **at least 2 names** for custom mode.');
        return;
    }
    if (playerNames.length > 10) {
        message.reply('Custom mode supports a **maximum of 10 players**.');
        return;
    }

    const [teamA, teamB] = divideIntoGroups(playerNames, 2);
    const map = pickRandom(maps, 1)[0];

    message.reply(
        `**Valorant Custom Match**\n` +
        `Map: **${map}**\n\n` +
        `**Team A:** ${teamA.join(' ')}\n` +
        `**Team B:** ${teamB.join(' ')}`
    );
}
