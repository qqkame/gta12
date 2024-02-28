const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-tag",
    description: '💙 Sunucuya giren üyelere otomatik tag verir!',
    type:1,
    options: [
        {
            name:"tag",
            description:"Lütfen bir tag girin!",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | İsimleri Yönet Yetkin Yok!", ephemeral: true})
    const tag = interaction.options.getString('tag')
    db.set(`ototag_${interaction.guild.id}`, tag)
    interaction.reply({content: "<:metrustik:1212410630317936700> | Başarıyla tagı "+tag+" olarak ayarladım!"})
}

};
