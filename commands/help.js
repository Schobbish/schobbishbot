// jshint esversion: 6
module.exports = {
    name: 'help',
    help: 'shows this message',
    execute(message, commands) {
        var commandArray = [];
        for (var commandName in commands) {
            // each commandField object will be put into the commandArray,
            // which will be embeded into the help message.
            // here's the format of the key: value pairs:
            // name: the command's name; value: the command's help text
            var commandField = {};
            commandField.name = `\`${commands[commandName].name}\``;
            commandField.value = commands[commandName].help;
            commandArray.push(commandField);
        }

        message.channel.send({
            embed: {
                title: 'Bot help',
                description: 'My commands are prefixed by \`schob\` and a space.',
                fields: commandArray
            }
        });
    }
};
