const { SlashCommandBuilder } = require('@discordjs/builders');
const discordPlayer = require('discord-player');
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("play a song from YouTube.")
        .addSubcommand(subcommand =>
            subcommand
            .setName("search")
            .setDescription("Searches for a song and plays it")
            .addStringOption(option =>
                option.setName("searchterms").setDescription("search keywords").setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName("playlist")
            .setDescription("Plays a playlist from YT")
            .addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName("song")
            .setDescription("Plays a single song from YT")
            .addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
        ),
    async execute({
        client,
        interaction
    }) {
        const embed = new EmbedBuilder()
        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)


        if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            // console.log(song)
            await queue.addTrack(song)

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({
                    text: `Duration: ${song.duration}`
                })

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            await queue.addTracks(result.tracks)

            embed
                .setDescription(`**[${result.playlist.title}](${result.playlist.url})** has been added to the Queue`)
                .setThumbnail(result.tracks[0].thumbnail)
        } else if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await queue.addTrack(song)

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({
                    text: `Duration: ${song.duration}`
                })
        }
        // console.log(queue);

        if (!queue.playing) await queue.play()
        queue.playing = true;

        await interaction.reply({
            embeds: [embed]
        });
    }
}