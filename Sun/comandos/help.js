const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

const embed = new Discord.MessageEmbed()
.setColor('DARK_PURPLE')
.setTitle(`❓ | Painel de ajuda - Sun`)
.setDescription(`⚙️** - Configuração**\n\`config\`, \`setlang\`\n\n👩‍🦰** - Informações**\n \`botinfo\`, \`userinfo\`, \`sobremim\`, \`profile\`, \`help\`\n\n📦** - Utilitarios**\n\`ping\`, \`avatar\`, \`atm\``)
.setThumbnail(bot.user.displayAvatarURL())
message.reply({ allowedMentions: { repliedUser: true }, embeds: [embed] });

}
