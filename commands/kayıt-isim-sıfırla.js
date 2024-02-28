const db = require("croxydb");

module.exports = {
  name: "kayıt-isim-sıfırla",
  description: "💙 Kayıt ismini sıfırlarsın!",
  options: [],
  
  run: async(client, interaction) => {

    const findDatabase = db.fetch(`kayıtlıuye_${interaction.user.id}`) ? true : false;

    if(findDatabase) {
      db.delete(`kayıtlıuye_${interaction.user.id}`)
      interaction.member.setNickname(`${interaction.user.username}`)

      return interaction.reply({ embeds: [{ description: "<:metrustik:1212410630317936700> | İsminiz başarıyla sıfırlandı." }] })
    } else {
      return interaction.reply({ embeds: [{ description: "<:metruscarpi:1212411181231247472>  | İsminiz kayıt sisteminde kayıtlı değildir." }] })
    }
  }
}