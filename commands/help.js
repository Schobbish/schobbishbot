// jshint esversion: 6
module.exports = {
    name: 'help',
    description: 'shows this message or gets help on commands',
    usage: '`schob help [command]`',
    arguments: `\`command\`: Optional. Gets help for this command. If ommitted, shows all commands.`,

    execute(message, words, commands) {
        // array of objects with name and value attributes
        var embedFields = [];
        // name of command
        var embedTitle = 'Bot help';
        // description of command
        var embedDescription = '';
        if (words[2] == undefined) {
            // when no command is specified
            for (var commandName in commands) {
                // each commandField object will be put into the embedFields,
                // which will be embeded into the help message.
                // here's the format of the key: value pairs:
                // name: the command's name; value: the command's help text
                var commandField = {};
                commandField.name = `\`${commands[commandName].name}\``;
                commandField.value = commands[commandName].description;
                embedFields.push(commandField);
            }
            embedDescription = 'My commands are prefixed by `schob` and a space. Use `schob help [command]` for more details on a command.';
        } else {
            // check if command exists
            if (commands[words[2]]) {
                embedTitle = `\`${words[2]}\``;
                embedDescription = commands[words[2]].description;
                // In the future we may need to be able to use a custom format,
                // probably through a `help` attribute but I like this better
                embedFields = [
                    {
                        name: 'Usage',
                        value: commands[words[2]].usage
                    }, {
                        name: 'Arguments',
                        value: commands[words[2]].arguments
                    }
                ];
            } else {
                embedTitle = '404 error';
                embedDescription = `command \`${words[2]}\` not found`;
            }
        }

        message.channel.send({
            embed: {
                title: embedTitle,
                description: embedDescription,
                fields: embedFields
            }
        });
    }
};
