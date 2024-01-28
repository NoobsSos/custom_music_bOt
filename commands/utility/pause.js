const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song'),
    async execute({ client, interaction }) {
        const queue = await client.player.getQueue(interaction.guildId)
        queue.setPaused(true);

        await interaction.reply('Paused the current song');
    }
}