const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const saveWEBP = require('../../utils/saveWEBP');
const AvailableMemes = require('../../utils/availableMemes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_meme')
        .setDescription('Create a meme')
        .addStringOption(option => option.setName('meme').setDescription('The meme to create').setRequired(true))
        .addStringOption(option => option.setName('upper').setDescription('The upper text').setRequired(false))
        .addStringOption(option => option.setName('lower').setDescription('The lower text').setRequired(false)),
        
    async execute({ client, interaction }) {
    
        try {
            if (!interaction.isChatInputCommand()) return;
            await interaction.deferReply();

            const meme = interaction.options.getString('meme');
            const upper = interaction.options.getString('upper') || "_";
            const lower = interaction.options.getString('lower') || "_";

            if (!Object.keys(AvailableMemes).includes(meme)) {
                await interaction.editReply(`Meme ${meme} not found. Use \`/available_memes\` to get a list of available memes.`);
                return;
            }

            await saveWEBP.download(`https://api.memegen.link/images/${meme.toLowerCase()}/${upper}/${lower}.webp`, `${meme}.webp`);
            
            const dirname = __dirname;
                
            // ДОРОБИТИ ЦЮ ШТУКУ, ЩОБ ПРАЦЮВАТИ НЕЗАЛЕЖНО
            // await interaction.editReply({ files: [`${dirname}/../../utils/memes/${meme}.webp`] });


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
