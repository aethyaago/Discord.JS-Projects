const Discord = require('discord.js'),
db = require("quick.db");

module.exports.run = async (bot, message, args) => {

let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author,
  
avatar = user.avatarURL({ dynamic: true, size: 1024, format: 'png' }),
  
language = db.fetch(`guilds_${message.guild.id}_language`),

embed = new Discord.MessageEmbed()
.setTitle(bot.lang[language].cmds.avatar.titleEmbed + "**__" + user.tag + "__**")
.setDescription(`[` + bot.lang[language].cmds.avatar.click[0] + "](" + avatar + ")" + bot.lang[language].cmds.avatar.click[1])
.setColor('DARK_PURPLE')
.setImage(avatar)
message.reply({embeds: [embed], allowedMentions: { repliedUser: true }})

}
module.exports.help = {
  name: "avatar"
}
