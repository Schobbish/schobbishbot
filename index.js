// add this bot to your server by following the link below:
// https://discordapp.com/oauth2/authorize?client_id=456973535689048064&scope=bot
// TODO:
//

const fs = require('fs');
const Discord = require('discord.js');
// you should not have recieved a copy of bot-token.json.
// if you have, you need to contact the repo's owner. thanks!
const token = require('./bot-token.json');
const client = new Discord.Client();

// get commands in commands/ and loop through them
var commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
    var command = require(`./commands/${file}`);
    // command name: command module
    commands[command.name] = command;
}

client.on('ready', function() {
    console.log('Ready! Press ctrl+c to quit');
    client.user.setActivity('`schob help`');
});

client.on('message', function(message) {
    words = message.content.split(' ');
    // check for my prefix
    if (words[0] == 'schob' || words[0] == 'Schob') {
        // check if command actually exists
        if (commands[words[1]] != undefined) {
            try {
                if (words[1] == 'help') {
                    // help is a special command and needs the commands object
                    commands.help.execute(message, words, commands);
                } else {
                    commands[words[1]].execute(message, words);
                }
            } catch (error) {
                console.error(error);
                message.channel.send('error');
            }
        } else {
            if (words[1] == undefined) {
                // this is when `schob` and nothing else
                commands.help.execute(message, words, commands);
            } else {
                message.channel.send(`\`${words[1]}\` is not one of my commands. Try \`schob help\` for help.`);
            }
        }
    }
});

client.login(token.Token);
