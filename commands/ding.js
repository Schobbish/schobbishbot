// jshint esversion: 6
module.exports = {
    name: 'ding',
    description: 'says dong',
    execute(message, args) {
        message.channel.send('dong');
    }
};
