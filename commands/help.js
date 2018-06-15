// jshint esversion: 6
module.exports = {
    name: 'help',
    description: 'says dong',
    execute(message, args) {
        message.channel.send(`My commands are prefixed by \`schob \`.
\`ding\`: say dong
\`info\`: info about this bot
\`help\`: show this help
        `);
    }
};
