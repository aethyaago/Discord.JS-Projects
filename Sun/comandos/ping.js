const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

let language = db.fetch(`guilds_${message.guild.id}_language`)

const embed = new Discord.MessageEmbed()
.setColor('DARK_PURPLE')
.setDescription(bot.lang[language].cmds.ping.descriptionEmbed + ` \`${bot.ws.ping}ms\`.`)
message.reply({ allowedMentions: { repliedUser: true }, embeds: [embed] });

}
module.exports.help = {
    name: "ping"
}
