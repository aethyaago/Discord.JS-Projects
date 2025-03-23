const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("[Economia] - Aposte seus RP's no cara ou coroa")
        .addStringOption(option =>
            option.setName("lado")
                .setDescription("Escolha entre 'cara' ou 'coroa'")
                .setRequired(true)
                .addChoices(
                    { name: "Cara", value: "cara" },
                    { name: "Coroa", value: "coroa" }
                )
        )
        .addIntegerOption(option =>
            option.setName("quantia")
                .setDescription("Quantidade de RP a apostar")
                .setRequired(true)
        ),
    async execute(interaction) {
        const betAmount = interaction.options.getInteger("quantia");
        const userChoice = interaction.options.getString("lado");
        const sides = ["cara", "coroa"];
        const coinResult = sides[Math.floor(Math.random() * sides.length)];
    
        const userId = interaction.user.id;
        let user = await User.findOne(userId);
    
        if (!user) {
            await User.create(userId);
            user = await User.findOne(userId);
        }
    
        if (betAmount < 100) {
            return interaction.reply({ content: "Você precisa apostar pelo menos 100 RP's.", ephemeral: true });
        }
    
        if (user.rp < betAmount) {
            return interaction.reply({ content: "Você não tem RP's suficientes para essa aposta.", ephemeral: true });
        }
    
        let resultMessage;
    
        if (userChoice === coinResult) {
            await User.update(userId, "rp", user.rp + betAmount);
            resultMessage = `Deu **${coinResult.toUpperCase()}**! Você ganhou **${betAmount.toLocaleString()} RP's**.\nSeu saldo agora é **${(user.rp + betAmount).toLocaleString()} RP's**.`;
        } else {
            await User.update(userId, "rp", user.rp - betAmount);
            resultMessage = `Deu **${coinResult.toUpperCase()}**. Você perdeu **${betAmount.toLocaleString()} RP's**.\nSeu saldo agora é **${(user.rp - betAmount).toLocaleString()} RP's**.`;
        }
    
        const embed = new EmbedBuilder()
            .setTitle("Resultado do Coinflip")
            .setDescription(resultMessage)
            .setColor("#9642c7")
            .setTimestamp()
            .setFooter({ text: "Lua - Todos os direitos reservados." });
    
        return interaction.reply({ embeds: [embed] });
    }
};
