const mserver = require("../mserver.js");
const MessageEmbed = require("discord.js").MessageEmbed;
const fs = require("fs");

var commandsInfo;

let execute = function(ARGUMENTS) {
    if (!commandsInfo) { //Get paths to all .js files in dir. 'commands'
        let CMDPATHS = fs.readdirSync("commands").filter((element) => {
            return element.endsWith(".js");
        });

        commandsInfo = CMDPATHS.map((element) => {
            return require(`./${element}`).info;
        });
    }

    let helpEmbed = new MessageEmbed()
        .setColor("#E67B29")
        .setTitle("Help")
        .setFooter("Boing - github.com/Tee1er/boing");

    if (ARGUMENTS.length <= 1) {

        for (element of commandsInfo) {
            helpEmbed.addFields({
                name: element.name,
                value: element.descrip,
                inline: true,
            });
        }
    } else {
        let command = commandsInfo.find((element) => {
            if (element.name == ARGUMENTS[1].toLowerCase()) return true;
        });

        helpEmbed.setTitle(`Help - ${ARGUMENTS[1]}`)

        if ("longDescrip" in command) {
            helpEmbed.setDescription(command.longDescrip);
        } else {
            helpEmbed.setDescription(command.descrip);
        }
    }

    return Promise.resolve(helpEmbed);

};

module.exports = {
    execute,
    info: {
        name: "help",
        descrip: "Provides help information. More detailed information can be found at the GitHub page for Boing.",
    },
};