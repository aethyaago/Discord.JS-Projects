const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { clientId, token } = require('./config.json');
const { REST, Routes } = require('discord.js');
const colors = require('colors');
const { SerialPort } = require('serialport');
const { Readline } = require('@serialport/parser-readline');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

const loadCommands = (folderPath) => {
    const folders = fs.readdirSync(folderPath);
    for (const folder of folders) {
        const subfolderPath = path.join(folderPath, folder);
        if (fs.statSync(subfolderPath).isDirectory()) {
            const commandFiles = fs.readdirSync(subfolderPath).filter(file => file.endsWith(".js"));
            let commandsLoaded = 0;

            for (const file of commandFiles) {
                const filePath = path.join(subfolderPath, file);
                const command = require(filePath);

                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    commandsLoaded++;
                    console.log(`✅ Comando carregado: ${command.data.name} (Categoria: ${folder})`.yellow);
                } else {
                    console.log(`❌ Erro ao carregar o comando em ${filePath}`.red);
                }
            }

            if (commandsLoaded > 0) {
                console.log(`🎉 Todos os comandos da categoria "${folder}" foram carregados com sucesso!`.green);
            } else {
                console.log(`⚠️ Nenhum comando foi carregado na categoria "${folder}".`.cyan);
            }
        }
    }
};

loadCommands(commandsPath);

const registerCommands = async () => {
    const commands = client.commands.map(command => command.data.toJSON());

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('📝 Registrando comandos no Discord...');

        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log('✅ Comandos registrados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao registrar comandos no Discord:', error);
    }
};

registerCommands();

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error('❌ Comando não encontrado');
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: 'O Bot teve algum erro', ephemeral: true });
    }
});

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

client.on("interactionCreate", async (interaction) => {
    const customId = interaction.customId;

    if (customId === 'CREATE_SPOILER') {
        const modal = new ModalBuilder()
            .setCustomId('SPOILER_MODAL')
            .setTitle('Criar spoiler');

        const msgInput = new TextInputBuilder()
            .setCustomId('spoiler_pergunta1')
            .setLabel('Qual o texto do spoiler?')
            .setStyle(TextInputStyle.Paragraph);
        const msg2Input = new TextInputBuilder()
            .setCustomId('spoiler_pergunta2')
            .setLabel('Qual o texto de exibição?')
            .setStyle(TextInputStyle.Paragraph);
        const urlInput = new TextInputBuilder()
            .setCustomId('spoiler_pergunta3')
            .setLabel('Link do print que deseja colocar no spoiler:')
            .setStyle(TextInputStyle.Short);

        const primeiro = new ActionRowBuilder().addComponents(msgInput);
        const segundo = new ActionRowBuilder().addComponents(msg2Input);
        const terceiro = new ActionRowBuilder().addComponents(urlInput);

        modal.addComponents(primeiro, segundo, terceiro);

        interaction.showModal(modal);
    }

    if (customId === 'SHOW_SPOILER') {
    }

    if (customId === 'SPOILER_MODAL') {
    }
});
client.login(token);
