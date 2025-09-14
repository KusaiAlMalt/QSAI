const { divideIntoTwoTeams } = require('../utils/teamDivider.js');

module.exports = {
    name: 'codenames',
    description: 'divides into blue and red team with 1 spymaster each',
    execute(message, args){
        if(args <= 0){
            message.reply('You provided no names, example of how to use the command:\n!codenames Alice Bob Eve')
            return
        }
        if(args == 1 && args==='load'){
            //load last used names
        }

        const [blueTeam, redTeam] = divideIntoTwoTeams(args);

        const blueSM = chooseSpyMaster(blueTeam);
        const redSM = chooseSpyMaster(redTeam);

        //embed this message instead of literal
        message.reply(`Blue Team: ${blueTeam.join(', ')} (SpyMaster: ${blueSM})\nRed Team: ${redTeam.join(', ')} (SpyMaster: ${redSM})`);
    }
}

function chooseSpyMaster(teamNames){
    return teamNames[Math.floor(Math.random()*teamNames.length)];
}