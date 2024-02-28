const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"rol-oluştur",
    description: '💙 Yeni Bir Rol Oluşturursun!',
    type:1,
    options: [
        {
            name:"isim",
            description:"Oluşturulucak Rolün Adı!",
            type:3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const isim = interaction.options.getString('isim')
   interaction.guild.roles.create({name: isim})
    interaction.reply({content: "<:metrustik:1212410630317936700> | Başarıyla **"+isim+"** Rolü Oluşturuldu."})
}

};
