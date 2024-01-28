const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),
    async execute({ client, interaction }) {
        const queue = await client.player.getQueue(interaction.guildId)
        queue.skip();

        await interaction.reply('Skipped the current song');
    }
}