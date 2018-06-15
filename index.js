// add this bot to your server by following the link below:
// https://discordapp.com/oauth2/authorize?client_id=456973535689048064&scope=bot
// TODO:
//

// jshint esversion: 6
const fs = require('fs');
const Discord = require('discord.js');
// you should not have recieved a copy of bot-token.json.
// if you have, you need to contact the repo's owner. thanks!
const token = require('./bot-token.json');
const info = require('./package.json');   // bad practice?
const client = new Discord.Client();
var commands = {};

// get commands in commands/ and loop through them
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
    var command = require(`./commands/${file}`);
    // key: command name; value: command module
    commands[command.name] = command;
}

client.on('ready', function() {
    console.log('Ready! Press ctrl+c to quit');
    client.user.setActivity('`schob help`');
});

client.on('message', function(message) {
    words = message.content.split(' ');
    if (words[0] == 'schob' || words[0] == 'Schob') {
        if (commands[words[1]] == undefined) {
            message.channel.send(`\`${words[1]}\` is not one of my commands. Try \`schob help\` for help.`);
        } else {
            try {
                commands[words[1]].execute(message, words);
            } catch (error) {
                console.error(error);
                message.channel.send('error');
            }
        }
    }
});
// message.channel.send(`\`${words[1]}\` is not one of my commands. Try \`schob help\` for help.`);
client.login(token.Token);
