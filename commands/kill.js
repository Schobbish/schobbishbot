const password = require('../bot-token.json');
module.exports = {
    name: 'kill',
    description: 'kills the bot. A password is required.',
    usage: '`schob kill <password>`',
    arguments: '`password`: must match the one in bot-token.json to kill the bot',

    execute(message, words) {
        if (words[2] === password.Password) {
            message.channel.send('Killing bot... Don\'t forget to change the password')
                .then(function() {
                    console.log('Bot killed remotely.');
                    process.exit(0);
                });
        } else {
            message.reply('wrong password');
        }
    }
};
