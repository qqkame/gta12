const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"görsel-engel",
    description: '💙 Görsel engel sistemini ayarlarsın!',
    type:1,
    options: [
        {
            name: "kanal",
            description: "Görsel engel kanalını ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:metruscarpi:1212411181231247472>  | Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`görselengel.${interaction.guild.id}`, kanal2.id)
   interaction.reply("<:metrustik:1212410630317936700> | <#"+kanal2+"> kanalında sadece gif ve resimlere izin vereceğim!")
}

};