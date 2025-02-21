const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchSkinInfo } = require('starlightskinapi');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Obtenha informações sobre o usuário ou servidor.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Exibe informações sobre o usuário')
        .addUserOption(option =>
          option.setName('target')
            .setDescription('O usuário que você quer ver as informações')
            .setRequired(false))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Exibe informações sobre o servidor'))
        .addSubcommand(subcommand =>
      subcommand
        .setName('minecraftuser')
        .setDescription('Exibe informações sobre um usuário de Minecraft')
        .addStringOption(option =>
          option.setName('nickname')
            .setDescription('O nome do jogador de Minecraft')
            .setRequired(true))
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target') || interaction.user;
      const member = await interaction.guild.members.fetch(user.id).catch(() => null); 
      let status = '❓ \`Desconhecido\`';
      if (member && member.presence) {
        const statusMap = {
          online: '🟢 \`Online\`',
          idle: '🌙 \`Ausente\`',
          dnd: '⛔ \`Não perturbe\`',
          offline: '⚫ \`Offline\`'
        };
        status = statusMap[member.presence.status] || '❓ Desconhecido';
      }

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(`👤 Informações sobre o usuário: ${user.tag}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .addFields(
          { name: '🆔 ID', value: `\`${user.id}\``, inline: true },
          { name: '📅 Conta criada em', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
          { name: '🌐 Status', value: status, inline: true },
        )
        .setFooter({ text: 'Comando executado por ' + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === 'server') {
      const guild = interaction.guild;
      const owner = await guild.fetchOwner();
      
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(`🏠 Informações sobre o servidor: ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .addFields(
          { name: '🆔 ID do Servidor', value: `\`${guild.id}\``, inline: true },
          { name: '👑 Dono', value: `\`${owner.user.tag} (${owner.user.id})\``, inline: true },
          { name: '👥 Total de Membros', value: `\`${guild.memberCount.toString()}\``, inline: true },
          { name: '📅 Criado em', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
        )
        .setFooter({ text: 'Comando executado por ' + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === 'minecraftuser') {
      const nickname = interaction.options.getString('nickname').trim();

      try {
        const renderTypes = [
          'default', 'marching', 'walking', 'crouching', 'crossed', 'criss_cross', 
          'ultimate', 'isometric', 'head', 'custom', 'cheering', 'relaxing', 'trudging', 
          'cowering', 'pointing', 'lunging', 'dungeons', 'facepalm', 'sleeping', 
          'dead', 'archer', 'kicking', 'mojavatar', 'reading', 'high_ground', 
          'bitzel', 'pixel', 'ornament', 'skin', 'profile'
        ];
  
        const crops = ['full', 'bust', 'face', 'head'];
  
        const randomRender = renderTypes[Math.floor(Math.random() * renderTypes.length)];
        const randomCrop = crops[Math.floor(Math.random() * crops.length)];
  
        const skinUrl = `https://starlightskins.lunareclipse.studio/render/${randomRender}/${nickname}/${randomCrop}`;
  
        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle(`🎮 Informações do jogador: ${nickname}`)
          .setThumbnail(`https://visage.surgeplay.com/head/${nickname}`)
          .setImage(skinUrl)
          .addFields(
            { name: '📛 Nickname', value: `\`${nickname}\``, inline: true },
            { name: '🔗 Baixar Skin', value: `[Clique aqui](https://starlightskins.lunareclipse.studio/skin/${nickname})`, inline: false }
          )
          .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
          .setTimestamp();
  
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error('❌ Erro ao buscar a skin:', error);
        await interaction.reply({ content: '❌ Ocorreu um erro ao buscar as informações do jogador.', ephemeral: true });
      }
    }
  }
  };
