const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const saveWEBP = require('../../utils/saveWEBP');
const AvailableMemes = require('../../utils/availableMemes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_meme')
        .setDescription('Create a meme')
        .addStringOption(option => option.setName('meme').setDescription('The meme to create').setRequired(true))
        .addStringOption(option => option.setName('animated').setDescription('Write yes if it should be animated').setRequired(true))
        .addStringOption(option => option.setName('upper').setDescription('The upper text').setRequired(false))
        .addStringOption(option => option.setName('lower').setDescription('The lower text').setRequired(false)),
        
    async execute({ client, interaction }) {
        try {
            if (!interaction.isChatInputCommand()) return;
            await interaction.deferReply();

            const meme = interaction.options.getString('meme').toLowerCase();
            const upper = interaction.options.getString('upper') || "_";
            const lower = interaction.options.getString('lower') || "_";
            const type = interaction.options.getString('animated') == "yes" ? "gif" : "png";

            if (!Object.values(AvailableMemes).includes(meme)) {
                await interaction.editReply(`Meme ${meme} not found. Use \`/available_memes\` to get a list of available memes.`);
                return;
            }

            await saveWEBP.download(`https://api.memegen.link/images/${meme}/${upper}/${lower}.${type}`, `${meme}.${type}`);
            
            const dirname = __dirname;
                
            // WORKS WITHOUT CONVERTAPI

            await interaction.editReply({ files: [`${dirname}/../../utils/memes/${meme}.${type}`] });


            // WORKS WITH CONVERTAPI BUT NEEDS API KEY AND SUBSCRIPTION

            // var convertapi = require('convertapi')('wT87oh8SxJpxQnlI');
            // const res = await convertapi.convert('gif', {
            //     Files: [
            //       `./utils/memes/${meme}.webp`
            //     ],
            //     AnimationDelay: '0',
            //     "StoreFile": true
            //     });
            // await interaction.editReply(res.file.url);

        } catch (error) {
            console.error(error);
        }
    }       
}
