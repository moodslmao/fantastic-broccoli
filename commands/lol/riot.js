const {SlashCommandBuilder} = require('@discordjs/builders');
const axios = require('axios');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('riot')
        .setDescription('Suche nach einem Riot-Konto und einem Summoner in League of Legends.')
        .addStringOption(option =>
            option.setName('riot_id')
                .setDescription('Der Riot-ID des Spielers.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tagline')
                .setDescription('test')
                .setRequired(true)),

    async execute(interaction) {
        const riotId = interaction.options.getString('riot_id');
        const tagLine = interaction.options.getString('tagline');

        try {
            const accountResponse = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagLine}?api_key=RGAPI-5ab5320b-26ca-47de-9218-8fa8a242dd95`, {});
            const puuid = accountResponse.data.puuid;

            const summonerResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=RGAPI-5ab5320b-26ca-47de-9218-8fa8a242dd95`, {});
            const summonerLevel = summonerResponse.data.summonerLevel;

            await interaction.reply(`Der Summoner ${riotId}#${tagLine} wurde gefunden. \n Level: ${summonerLevel} \n PUUID: ${puuid}`);
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Es gab einen Fehler beim Abrufen der Daten.');
        }
    },
};
