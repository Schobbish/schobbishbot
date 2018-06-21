const info = require('../package.json'); // now is this bad practice
module.exports = {
    name: 'info',
    description: 'shows info about this bot',
    usage: '`schob info`',
    arguments: 'No additional arguments.',

    execute(message, words) {
        message.channel.send({
            embed: {
                title: 'Bot info',
                description: `${info.description} v${info.version}
\u00a9 Copyright 2018 ${info.author}.
Licensed under the ${info.license} license.
[GitHub](${info.homepage}) - say \`schob help\` for help`
            }
        });
    }
};
