const { SlashCommandBuilder } = require('@discordjs/builders');
const AvailableMemes = require('../../utils/availableMemes');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('available_memes')
        .setDescription('List of available memes'),

    async execute({ client, interaction }) {
        try {
            if (!interaction.isChatInputCommand()) return;
            await interaction.deferReply();

            const memes = Object.keys(AvailableMemes);
            const memesList = memes.join('\n');

            await interaction.editReply(memesList);
        } catch (error) {
            console.error(error);
        }
    }
}