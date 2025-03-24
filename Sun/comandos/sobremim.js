const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

let conteudo = args.join(" ");
if(!conteudo){
  message.reply({ allowedMentions: { repliedUser: false }, content: `🎃 **|** Você precisa digitar algo para seu sobre mim.` });
  return false;
}
  if(conteudo === 'null'){
    conteudo = 'Utilize sn.sobremim para mudar está mensagem.'
  }
  if(conteudo.length > 65){
    return message.reply({content: `🎃 **|** Texto muito grande.`, allowedMentions: { repliedUser: false }})
  }

const embed = new Discord.MessageEmbed()
.setColor('DARK_PURPLE')
.setDescription(`Você alterou seu sobre mim para: \`${conteudo}\`.`)
message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] })
db.set(`sobremim_${message.author.id}`, conteudo);

}
module.exports.help = {
    name: "sobremim"
}
