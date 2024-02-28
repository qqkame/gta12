const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-rol-kapat",
    description: '💙 Oto-Rol Sistemini kapatır!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | Rolleri Yönet Yetkin Yok!", ephemeral: true})
    db.delete(`otorol_${interaction.guild.id}`)
    db.delete(`botrol_${interaction.guild.id}`)
    interaction.reply({content: "<:metrustik:1212410630317936700> | Otorol Başarıyla kapatıldı!"})
}

};
