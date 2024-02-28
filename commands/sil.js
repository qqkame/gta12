const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"sil",
    description: '💙 Sohbette istediğin kadar mesajı silersin!',
    type:1,
    options: [
        {
            name:"sayı",
            description:"Temizlencek Mesaj Sayısını Girin.",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | Mesajları Yönet Yetkin Yok!", ephemeral: true})
    const sayi = interaction.options.getString('sayı')
    interaction.channel.bulkDelete(sayi)
    interaction.reply({content: "<:metrustik:1212410630317936700> | Başarıyla belirtilen adet mesajı sildim."})
}

};
