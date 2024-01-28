const joiner = require('../../utils/connectVoice.js')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the voice channel you are in'),
    async execute(interaction) {
        await joiner.run(interaction);

        await interaction.reply('Joined the voice channel!');
    },
};