const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

let sois = db.get(`sois_${message.author.id}`)

if(sois === null){
  sois = 0
}

message.reply({ allowedMentions: { repliedUser: true }, content: `🎃 **|** Você possui **${sois} Sóis**.` });

}
module.exports.help = {
    name: "atm"
}
