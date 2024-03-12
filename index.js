const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.on('ready', () => {
	console.log('Der Bot ist online.');
	client.user.setStatus('idle');
	client.user.setActivity({
		type: ActivityType.WATCHING,
		name: 'mit Bienen.',
	});
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
