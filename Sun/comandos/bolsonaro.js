const Discord = require('discord.js');
const db = require('quick.db');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
const Canvas = require('canvas');
Canvas.registerFont("./fonts/uni-sans.ttf", { family: "Uni" });

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  


const canvas = Canvas.createCanvas(611, 458);
		const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/sun-profile.png');
    const bg = await Canvas.loadImage('./images/bolsonaro.jpg');
context.drawImage(bg, 0, 0, canvas.width, canvas.height);
const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "jpeg", size: 2048 })
    );

  if(message.attachments.first() === undefined){
    context.drawImage(avatar, 283, 35, 265, 190);
    }
    if(message.attachments.first() !== undefined){
context.drawImage(fotou, 230, 0, 300, 200);
}

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sun-meme.png');

message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });

}
