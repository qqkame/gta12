const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const ms = require("ms")
const db = require("croxydb")

module.exports = {
    name: "timeout",
    description: "💙 Kullanıcıyı belirttiğin süre boyunca susturursun.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Kimi susturmamı istersin?",
            required: true
        },
        {
            type: 3,
            name: "süre",
            description: "Ne kadar süre susturmamı istersin? 1m, 1h, 1d gibi bir süre belirt.",
            required: true
        },
        {
            type: 3,
            name: "sebep",
            description: "Üyeye neden timeout atıyorsun?",
            required: true
        }
    ],
    type: 1,

    run: async (client, interaction) => {

        let data = db.get(`timeoutSistemi_${interaction.guild.id}`)
        if (!data) return interaction.reply({ content: "<:metruscarpi:1212411181231247472>  | Dostum **__Timeout Sistemi__** ayarlanmamış.", ephemeral: true })


        let yetkili = data.yetkili
        let kanal = data.log
        let channel = client.channels.cache.get(kanal)
        if (!channel) return interaction.reply({ content: `<:metruscarpi:1212411181231247472>  | Dostum **__Timeout Sistemi__** log kanalı bulunamadı.`, ephemeral: true })

        const uyeYetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`<:metruscarpi:1212411181231247472>  | Bu komutu kullanabilmek için <@&${yetkili}> rolüne sahip olmalısın!`)

        const botYetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Bunu yapabilmek için yeterli yetkiye sahip değilim.")

        const uyeBulunamadi = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Belirttiğin üyeyi bulamadım.")

        const pozisyon = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Kullanıcının rolü benim rolümden yüksek.")

        const pozisyon2 = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Kullanıcının rolü senin rolünden yüksek.")

        const sunucuSahibi = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Sunucu sahibini susturamazsın dostum.")

        const kendiniSusturma = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Kendine neden timeout atmak istersin ki?")

        const botuSusturma = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Ben bir botum, beni susturup ne yapacaksın?")

        const gecerliSure = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Susturabilmem için geçerli bir süre girmelisin.")

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<:metruscarpi:1212411181231247472>  | Komutu kullanırken bir hata oluştu.")

        const kullanıcı = interaction.options.getMember("kullanıcı")
        const süre = interaction.options.getString("süre")
        const sebep = interaction.options.getString("sebep")

        if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [uyeYetki], ephemeral: true })
        let me = interaction.guild.members.cache.get(client.user.id)
        if (!me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ embeds: [botYetki], ephemeral: true })

        if (!kullanıcı) return interaction.reply({ embeds: [uyeBulunamadi], ephemeral: true })
        if (interaction.guild.ownerId === kullanıcı.id) return interaction.reply({ embeds: [sunucuSahibi], ephemeral: true })
        if (interaction.author === kullanıcı.id) return interaction.reply({ embeds: [kendiniSusturma], ephemeral: true })
        if (client.user.id === kullanıcı.id) return interaction.reply({ embeds: [botuSusturma], ephemeral: true })

        if (interaction.guild.ownerId !== interaction.author) {
            if (kullanıcı.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [pozisyon2], ephemeral: true })
        }

        if (kullanıcı.roles.highest.position >= me.roles.highest.position) return interaction.reply({ embeds: [pozisyon], ephemeral: true })

        const timeout = ms(süre)
        if (!timeout) return interaction.reply({ embeds: [gecerliSure], ephemeral: true })

        await kullanıcı.timeout(timeout).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
        // 
        const logMessage = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("<:metrustik:1212410630317936700> | Bir Üye Susturuldu!")
            .setDescription(`<@${interaction.user.id}> adlı yetkili <@${kullanıcı.id}> adlı kişiyi **${süre}** boyunca \`${sebep}\` sebebiyle susturdu!`)
            .setTimestamp()
            .setThumbnail(kullanıcı.avatarURL({ dynamic: true }))

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:metrustik:1212410630317936700> | ${kullanıcı} adlı kullanıcıya **${süre}** süre boyunca timeout atıldı!`)

        channel.send({ embeds: [logMessage] }).catch((e) => { })
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }
};
