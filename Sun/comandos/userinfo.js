const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
moment.locale('pt-br')

module.exports.run = async (bot, message, args) => {

const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

let premium = db.get(`premium_${target.id}`)

if(premium === null){
  premium = "Não"
}
if(premium === true){
  premium = "Sim"
}

const embed = new Discord.MessageEmbed()
.setTitle(`Info | ${target.user.tag}`)
.setDescription(`Username: \`${target.user.username}\`\nID: \`${target.id}\`\n\nConta criada há: \`${moment(target.user.createdAt).format('DD/MM/YYYY, à\\s HH:mm:ss')}\`\nEntrou há \`${moment(target.joinedAt).format('DD/MM/YYYY, à\\s HH:mm:ss')}\`\n\nPremium: \`${premium}\``)
.setThumbnail(target.displayAvatarURL({dynamic: true}))
.setColor('DARK_PURPLE')
message.reply({embeds: [embed], allowedMentions: { replidUser: false }})

}
