const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Turning on the music'),
    async execute({ client, interaction }) {
        const queue = await client.player.getQueue(interaction.guildId)

        await queue.play();
    }
}