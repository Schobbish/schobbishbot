// jshint esversion: 6
// https://discordapp.com/oauth2/authorize?client_id=456973535689048064&scope=bot
var Discord = require('discord.js');
// you should not have recieved a copy of bot-config.json.
// if you have, you need to contact the repo's owner.
var config = require('./bot-config.json');
var client = new Discord.Client();

client.on('ready', function() {
    console.log('Ready!');
    client.user.setActivity('`schob help`');
});

client.on('message', function(message) {
    words = message.content.split(' ');
    if (words[0] == config.prefix) {

        switch (words[1]) {
            case 'ding':
                message.channel.send('dong');
                break;

            case 'help':
            case undefined:
                message.channel.send(`My commands are prefixed by \`schob \`.
\`ding\`: say dong
\`help\`: show this help
                `);
                break;
            default:
                message.channel.send(`\`${words[1]}\` is not one of my commands. Try \`schob help\` for help.`);

        }
    }
});

client.login(config.token);
