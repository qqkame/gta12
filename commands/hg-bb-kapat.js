const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"giriş-çıkış-kapat",
    description: '💙 Giriş Çıkış Sistemini kapatırsın!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | Kanalları Yönet Yetkin Yok!", ephemeral: true})
   db.delete(`hgbb_${interaction.guild.id}`)
   interaction.reply("<:metrustik:1212410630317936700> | Hoşgeldin Güle Güle Kanalı Başarıyla Sıfırlandı!")
}

};
