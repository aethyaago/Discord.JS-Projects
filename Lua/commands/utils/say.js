const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("[Utils] - Oque você quer que eu diga?")
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('Digite o texto')
                .setRequired(true))
        .setDefaultPermission(true),
    async execute(interaction) {
        const canal = interaction.options.getString('texto');

        interaction.reply({content: `${canal}`, ephemeral: false})
    }
}
