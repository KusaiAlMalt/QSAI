const { divideIntoTwoTeams } = require('../utils/teamDivider.js');

module.exports = {
    name: 'codenames',
    description: 'divides into blue and red team with 1 spymaster each',
    example: 'Example of how to use the command:\n`!codenames Alice Bob Carol Eve`',
    execute(message, args){
        if(args.length <= 0){
            message.reply(`You provided no names. ${this.example}`)
            return
        }
        if(args.length === 1 && args==='load'){
            //load last used names
        }
        if(args.length < 4){
            message.reply(`Provide at least four names. ${this.example}`)
            return
        }

        const [blueTeam, redTeam] = divideIntoTwoTeams(args);

        const [[blueSpymaster], blueOperatives] = pickSpymasterAndOperative(blueTeam);
        const [[redSpymaster], redOperatives] = pickSpymasterAndOperative(redTeam);

        const blueMessage = `__Blue Team__:\nOperatives: ${blueOperatives.join(' ')}\nSpymaster: ${blueSpymaster}`
        const redMessage = `__Red Team__:\nOperatives: ${redOperatives.join(' ')}\nSpymaster: ${redSpymaster}`

        //embed this message instead of literal
        message.reply(`${redMessage}\n${blueMessage}`);
    }
}

function pickSpymasterAndOperative(teamNames){
    const spyIndex = Math.floor(Math.random()*teamNames.length);
    const spymaster = teamNames[spyIndex];
    const operatives = teamNames.filter((_, i) => i !== spyIndex);
    
    return [[spymaster], operatives];
}