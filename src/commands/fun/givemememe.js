const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Postet ein zufälliges Meme von der Meme-API.'),
	async execute(interaction) {
		try {
			const response = await axios.get('https://meme-api.com/gimme');
			const memeData = response.data.title;
			const memeurl = response.data.url;
			const memesubreddit = response.data.subreddit;

			console.log(memeData);

			await interaction.reply(`${memeData} | r/${memesubreddit} \n${memeurl}`);
		}
		catch (error) {
			console.error('Fehler beim Abrufen des Memes:', error);
			await interaction.reply('Es gab einen Fehler beim Abrufen des Memes.');
		}
	},
};
