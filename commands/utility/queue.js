const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the queue'),
    async execute({ client, interaction }) {
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        const queueString = queue.tracks.slice(0, 10).map((song, i) => {
            return `${i}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`
        }).join("\n");

        const currentSong = queue.current;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently Playing**\n` +
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setThumbnail(currentSong.thumbnail)
            ]
        });
    }
};
