const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-tag-kapat",
    description: '💙 Oto-tag sistemini kapatırsın!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | İsimleri Yönet Yetkin Yok!", ephemeral: true})
    db.delete(`ototag_${interaction.guild.id}`)
    interaction.reply({content: "<:metrustik:1212410630317936700> | Başarıyla sistemi sıfırladım!"})
}

};
