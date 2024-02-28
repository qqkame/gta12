const { Client, EmbedBuilder, ButtonBuilder, ActionRow } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "davet",
  description: "💙 Botun davet linkini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const dvt = new Discord.ButtonBuilder().setLabel('Davet Linkim').setStyle('Link').setEmoji('1063843026482503739').setURL('https://discord.com/api/oauth2/authorize?client_id=1208440543437127731&permissions=8&scope=bot');
	const destek = new Discord.ButtonBuilder().setLabel('Destek Sunucum').setStyle('Link').setEmoji('1044325557615202364').setURL('https://discord.gg/Gn3HHVW4Re');
    const row = new Discord.ActionRowBuilder().addComponents(dvt).addComponents(destek)
    const embed = new EmbedBuilder()
    .setAuthor({ name: "Merhaba, Ben AgentPhanter!", iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })})
.setTitle("AgentPhanter'u Davet Et!")
.setDescription(`<:Bot:1212411993147834409> | AgentPhanter'u şimdi sunucuna davet et ve botun tadını çıkar!`)
.setColor('#2F3136')
.setTimestamp()
.setFooter({text: interaction.user.tag+" İstedi.", iconURL: interaction.user.displayAvatarURL({ dynamic: true })})

interaction.reply({ embeds: [embed], components:[row]});
  }  

};