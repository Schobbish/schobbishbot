module.exports = {
    name: 'convert',
    description: 'converts between units',
    usage: '`schob convert <quantity> <inital unit> <final unit>`',
    arguments: `\`quantity\`: Any number
\`inital unit\`: The unit of quantity (the starting unit)
\`final unit\`: The unit to convert quantity units to
    `,
    additionalHelp: [
        {
            name: 'Supported units',
            value: 'g, m, and s with their case-sensitive SI prefixes, lbs, mi, ft, in'
        }
    ],

    execute(message, words) {
        /* mapping of supported imperial units to an object with two attributes:
         * factor: the number you need to multiply one of this unit by to
         *      convert to its corresponding si base unit
         * type: the corresponding si base unit
         */
        var imperials = new Map();
        // set of supported base si units
        const si = new Set(['g', 'm', 's']);
        // mapping of si prefixes to their factor
        var prefixes = new Map();
        /* the two units given by the user - first initial then final.
         * both values are a generic object with some helpful attributes:
         * name: the name of the unit,
         * factor: what to multiply one of this unit by to get the base unit, &
         * type: the corresponding si base unit
         */
        var units = [];
        // the quantity, given by the user
        const quantity = Number(words[2]);

        // these three will be combined into imperials
        const imperialUnitsList = 'lb mi ft in'.split(' ');
        const imperialUnitFactors = '453.59237 1609.344 0.3048 0.0254'.split(' ');
        const imperialUnitTypes = 'g m m m'.split(' ');
        for (var i1 = 0; i1 < imperialUnitsList.length; i1++)
            imperials.set(imperialUnitsList[i1], {
                factor: imperialUnitFactors[i1],
                type: imperialUnitTypes[i1]
            });
        // similarly, these two will be combined into prefixes
        const prefixList = 'EPTGMkhDdcmunpfa'.split('');
        const prefixFactors = [1e18, 1e15, 1e12, 1e9, 1e6, 1e3, 100, 10, 0.1, 0.01, 1e-3, 1e-6, 1e-9, 1e-12, 1e-15, 1e-18];
        for (var i2 = 0; i2 < prefixList.length; i2++)
            prefixes.set(prefixList[i2], prefixFactors[i2]);

        try {
            // check if all arguments are there
            if (words[2] == undefined)
                throw new Error('`quantity` is a required argument but was ommitted.');
            if (words[3] == undefined)
                throw new Error('`inital unit` is a required argument but was ommitted.');
            if (words[4] == undefined)
                throw new Error('`final unit` is a required argument but was ommitted.');
            // check if quantity is a number
            if ((!quantity) && quantity !== 0)
                throw new Error('`quantity` should be a number but it isn\'t.');
            // check unit
            for (var i of [3, 4]) {
                if (imperials.has(words[i])) {
                    // then it is imperial
                    units[i - 3] = {
                        name: words[i],
                        factor: imperials.get(words[i]).factor,
                        type: imperials.get(words[i]).type
                    };
                } else {
                    if (si.has(words[i][1]) && words[i].length == 2) {
                        // then it is an si unit. check prefix
                        if (prefixes.has(words[i][0])) {
                            // then it is correct
                            units[i - 3] = {
                                name: words[i],
                                factor: prefixes.get(words[i][0]),
                                type: words[i][1]
                            };
                        } else {
                            throw new Error(`unrecognized SI prefix ${words[i][0]}. da- has been changed to D- (by me).`);
                        }
                    } else if (words[i].length == 1 && si.has(words[i])) {
                        // then it is a base si unit and is correct
                        units[i - 3] = {
                            name: words[i],
                            factor: 1,
                            type: words[i]
                        };
                    } else {
                        throw new Error(`unrecognized unit ${words[i]}.`);
                    }
                }
            }
            // check if types match
            if (units[0].type != units[1].type)
                throw new Error(`${units[0].name} and ${units[1].name} are not the same type of unit`);

            // all checks done; now convert
            // quantity converted to the base unit
            var baseQuantity = quantity * units[0].factor;
            // the final quantity
            var finalQuantity = baseQuantity / units[1].factor;
            finalQuantity = finalQuantity.toPrecision(3);
            message.channel.send(`${quantity} ${units[0].name} is equal to ${finalQuantity} ${units[1].name}.`);
        } catch (e) {
            var error = `${e}\n\nSay \`schob help convert\` if you need help.`;
            message.channel.send(error);
        }
    }
};
