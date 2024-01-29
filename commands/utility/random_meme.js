const { SlashCommandBuilder } = require('@discordjs/builders');
const AvailableMemes = require('../../utils/availableMemes');
const saveWEBP = require('../../utils/saveWEBP');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_meme')
        .setDescription('create a random meme')
        .addStringOption(option => option.setName('upper').setDescription('The upper text').setRequired(false))
        .addStringOption(option => option.setName('lower').setDescription('The lower text').setRequired(false)),
    async execute({ client, interaction }) {
        try {
            const rand = Math.floor(Math.random() * Object.keys(AvailableMemes).length);

            const meme = AvailableMemes[Object.keys(AvailableMemes)[rand]];            
            const upper = interaction.options.getString('upper') || "_";
            const lower = interaction.options.getString('lower') || "_";

            await interaction.deferReply();

            await saveWEBP.download(`https://api.memegen.link/images/${meme.toLowerCase()}/${upper}/${lower}.webp`, `${meme}.webp`);

            var convertapi = require('convertapi')('wT87oh8SxJpxQnlI');
            const res = await convertapi.convert('gif', {
                Files: [
                  `./utils/memes/${meme}.webp`
                ],
                AnimationDelay: '0',
                "StoreFile": true
                });
            await interaction.editReply(res.file.url);
        } catch (error) {
            console.error(error);
        }
    }
}