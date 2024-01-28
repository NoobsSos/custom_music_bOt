const QRcreator = require("../../utils/createQR");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("qr")
        .setDescription("Generates a QR code from a given url")
        .addStringOption(option => option.setName("url").setDescription("The url to generate a QR code from").setRequired(true))
        .addStringOption(option => option.setName("height").setDescription("The height of the QR code").setRequired(false))
        .addStringOption(option => option.setName("width").setDescription("The width of the QR code").setRequired(false)),
    async execute(interaction) {
        const url = interaction.options.getString("url");
        const height = interaction.options.getString("height");
        const width = interaction.options.getString("width");

        const qr = QRcreator.createQR(url, height, width);
        await interaction.reply(qr);
    },
};