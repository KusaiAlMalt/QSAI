const fs = require('fs');
const path = require('path');


function loadCommands(){
    const commands = new Map();

    
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles){
        const command = require(`../commands/${file}`);

        if (!command.name || typeof command.execute !== 'function'){
            console.warn(`Invalid command file: ${file} was skipped`);
            continue;
        }

        commands.set(command.name, command);
    }

    return commands;
}

module.exports = {loadCommands};