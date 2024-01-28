const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the queue'),
    async execute({ client, interaction }) {
        const queue = await client.player.getQueue(interaction.guildId)
        queue.clear();

        await interaction.reply('Cleared the queue');
    }
}