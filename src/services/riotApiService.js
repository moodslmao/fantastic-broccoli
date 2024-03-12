require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.RGAPI_KEY;

async function getAccountByRiotId(riotId, tagLine) {
	try {
		const accountResponse = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagLine}?api_key=${apiKey}`, {});
		return accountResponse.data;
	}
	catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function getSummonerByPuuid(puuid) {
	try {
		const summonerResponse = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`, {});
		return summonerResponse.data;
	}
	catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function getSummonerRankedBySummonerId(summonerId) {
	try {
		const summonerRanked = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`, {});
		return summonerRanked.data;
	}
	catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

module.exports = {
	getAccountByRiotId,
	getSummonerByPuuid,
	getSummonerRankedBySummonerId,
};