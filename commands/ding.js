// jshint esversion: 6
module.exports = {
    name: 'ding',
    description: 'says dong',
    usage: '`schob ding`',
    arguments: 'No additional arguments.',
    
    execute(message, args) {
        message.channel.send('dong');
    }
};
