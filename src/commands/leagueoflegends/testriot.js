const { SlashCommandBuilder } = require('@discordjs/builders');
const riotApiService = require('../../services/riotApiService');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('testriot')
		.setDescription('Suche nach einem Riot-Konto und einem Summoner in League of Legends.')
		.addStringOption(option =>
			option.setName('riot_id')
				.setDescription('Der Riot-ID des Spielers.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('tagline')
				.setDescription('test')
				.setRequired(true)),

	async execute(interaction) {
		const riotId = interaction.options.getString('riot_id');
		const tagLine = interaction.options.getString('tagline');

		try {
			const riotAccountData = await riotApiService.getAccountByRiotId(riotId, tagLine);
			const summonerData = await riotApiService.getSummonerByPuuid(riotAccountData.puuid);
			const summonerRankedData = await riotApiService.getSummonerRankedBySummonerId(summonerData.id);

			await interaction.reply(`Der Summoner ${riotId}#${tagLine} wurde gefunden. \n Level: ${summonerData.summonerLevel} \n PUUID: ${riotAccountData.puuid} \n Solo Queue: ${summonerRankedData.queueType}`);
		}
		catch (error) {
			console.error('Error:', error);
			await interaction.reply('Es gab einen Fehler beim Abrufen der Daten.');
		}
	},
};
