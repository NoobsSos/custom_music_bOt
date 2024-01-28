const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the current song'),
    async execute({ client, interaction }) {
        const queue = await client.player.getQueue(interaction.guildId)
        queue.setPaused(false);

        await interaction.reply('Resumed the current song');
    }
}