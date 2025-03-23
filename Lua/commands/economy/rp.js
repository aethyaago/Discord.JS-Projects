const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rp")
        .setDescription("Gerencie seus RP's.")
        .addSubcommand(subcommand =>
            subcommand.setName("daily").setDescription("Resgata sua recompensa diária"))
        .addSubcommand(subcommand =>
            subcommand.setName("semanal").setDescription("Resgata sua recompensa semanal"))
        .addSubcommand(subcommand =>
            subcommand.setName("atm").setDescription("Verifica seu saldo de RP's"))
        .addSubcommand(subcommand =>
            subcommand.setName("rank").setDescription("Veja os usuários mais ricos")),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.user.id;

        let user = await User.findOne(userId);
        if (!user) {
            await User.create(userId);
            user = await User.findOne(userId);
        }

        const now = new Date();

        if (subcommand === "daily") {
            const lastDaily = user.lastDaily ? new Date(user.lastDaily) : null;
            const cooldown = 24 * 60 * 60 * 1000;

            if (lastDaily && now - lastDaily < cooldown) {
                return interaction.reply({ content: `⏳ | Tente novamente depois!`, ephemeral: true });
            }

            const reward = Math.floor(Math.random() * 200) + 50;
            await User.update(userId, "rp", user.rp + reward);
            await User.update(userId, "lastDaily", now);

            const embed = new EmbedBuilder()
                .setTitle("🎉 | Recompensa Diária")
                .setDescription(`Você recebeu **${reward} RP's**!`)
                .setColor("#9642c7");

            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === "semanal") {
            const lastSemanal = user.lastSemanal ? new Date(user.lastSemanal) : null;
            const cooldown = 7 * 24 * 60 * 60 * 1000;

            if (lastSemanal && now - lastSemanal < cooldown) {
                return interaction.reply({ content: `⏳ | Tente novamente depois!`, ephemeral: true });
            }

            const reward = Math.floor(Math.random() * 500) + 100;
            await User.update(userId, "rp", user.rp + reward);
            await User.update(userId, "lastSemanal", now);

            const embed = new EmbedBuilder()
                .setTitle("🎉 | Recompensa Semanal")
                .setDescription(`Você recebeu **${reward} RP's**!`)
                .setColor("#9642c7");

            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === "atm") {
            const embed = new EmbedBuilder()
                .setTitle("💰 | Seu Saldo")
                .setDescription(`Seu saldo atual é **${user.rp} RP's**.`)
                .setColor("#9642c7");

            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === "rank") {
            const topUsers = await User.getTopUsers();
            let rankList = topUsers.map((u, i) => `**${i + 1}.** <@${u.userId}> - **${u.rp} RP's**`).join("\n");

            const embed = new EmbedBuilder()
                .setTitle("🏆 | Ranking de RP's")
                .setDescription(rankList || "Ninguém no ranking ainda.")
                .setColor("#9642c7");

            return interaction.reply({ embeds: [embed] });
        }
    },
};
