// jshint esversion: 6
module.exports = {
    name: 'ding',
    help: 'says dong',
    execute(message, args) {
        message.channel.send('dong');
    }
};
