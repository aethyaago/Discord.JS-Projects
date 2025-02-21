
const fs = require("node:fs");
const path = require("node:path")
const { Client, ChannelType, GatewayIntentBits, EmbedBuilder, PermissionsBitField, ActivityType, PermissionFlagsBits, Permissions, MessageManager, Embed, Collection, Events, GuildMember, GuildHubType, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { AuditLogAction } = require('discord.js');
const Discord = require("discord.js")
const { REST, Routes } = require('discord.js');
const { ID_BOT, TOKEN, DONO } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log(`Recarregando ${commands.length} comandos em slash.`);

		const data = await rest.put(
			Routes.applicationCommands(ID_BOT),
			{ body: commands },
		);

		console.log(`Recarregados ${data.length} comandos em slash.`);
	} catch (error) {
		console.error(error);
	}
})();

const client = new Client({ intents: [Object.keys(GatewayIntentBits), GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log("algum comando deu erro")
    }
}

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);
    

    if(!command){
        console.error('Sem comandos na pasta')
        return;
    }

    try{
        command.execute(interaction);
    } catch (error){
        console.error(error)
        interaction.reply({content: 'O Bot teve algum erro'})
    }
})
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
process.on('unhandledRejection', error => {
  console.error('Erro:', error);
});
process.on('uncaughtException', error => {
  console.error('Erro:', error);
});


client.login(TOKEN)
