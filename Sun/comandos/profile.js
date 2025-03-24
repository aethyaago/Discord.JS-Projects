const Discord = require('discord.js');
const db = require('quick.db');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
const Canvas = require('canvas');
Canvas.registerFont("./fonts/uni-sans.ttf", { family: "Uni" });

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  
  let sobremim = db.get(`sobremim_${user.id}`);
  if(sobremim === null){
    sobremim = 'Utilize sn.sobremim para mudar está mensagem.'
  }

const canvas = Canvas.createCanvas(611, 458);
		const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/sun-profile.png');
    const bg = await Canvas.loadImage('./images/background.jpg');

context.drawImage(bg, 0, 0, canvas.width, canvas.height);
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	let sois = db.get(`sois_${user.id}`)

if(sois === null){
  sois = 0
}
const premium = db.get(`premium_${message.author.id}`)

  context.font = '30px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillText(`${user.tag}`, 170, 55);
    context.font = '26px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillText(`${sois} Sóis`, 170, 88);
    context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `☀️`, 135, 88);;
  context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillText(`Sobre Mim`, 3, 373);
    context.font = '20px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `${sobremim}`, 3, 410);
  if(premium === null){
    context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, ``, 128, 377);
    }
  if(premium == true){
  context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `<:rikka_vip:903364251702423642>`, 185, 377);
  }
      if(message.guild.id === '745337964548194335'){
        context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `<:BP_blue_phoenix:822142851651600444>`, 128, 377);
    }
    if(message.guild.id === '856229005639155753'){
        context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `<:discobots:901517749044531311>`, 128, 377);
    }
    if(user.id === '895837365740908584' ){
        context.font = '23px "Uni"';
  context.fillStyle = '#ffffff';
context.strokeRect(0, 0, canvas.width, canvas.height);
  await fillTextWithTwemoji(context, `<:coroa_vip:900893350679416855>`, 155, 377);
    }
		context.arc(60, 60, 57, 0, Math.PI * 2, true);
context.LineWidth - 6;
context.strokeStyle - '#fafSfS',
context.stroke();
context.closePath();
context.clip();
	const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "jpeg", size: 2048 })
    );
    context.drawImage(avatar, 0, 0, 123, 123);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sun-profile.png');

message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });

}
