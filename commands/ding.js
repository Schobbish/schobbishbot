module.exports = {
    name: 'ding',
    description: 'says dong',
    usage: '`schob ding`',
    arguments: 'No additional arguments.',

    execute(message, words) {
        message.channel.send('dong');
    }
};
