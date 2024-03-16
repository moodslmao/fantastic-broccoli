const { SlashCommandBuilder } = require('@discordjs/builders');
const dbService = require('../../services/dbService');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('db')
		.setDescription('Verschiedene Datenbank-Operationen.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Erstellt eine neue Datenbank.')),
	async execute(interaction) {
		try {
            const subcommand = interaction.options.getSubcommand();
            
            switch(subcommand) {
                case 'create':
					await interaction.reply('Erstelle Datenbank...');

					try {
						await dbService.createDatabase('beebot');
						await interaction.editReply('Datenbank wurde erstellt.');
					}
					catch (error) {
						console.error('Fehler bei der Datenbankoperation:', error);
						await interaction.editReply('Es gab einen Fehler beim ausführen der Datenbank-Operation.');
						return;
					}
                    break;
            }
		}
		catch (error) {
			console.error('Fehler bei der Datenbankoperation:', error);
			await interaction.reply('Es gab einen Fehler beim ausführen der Datenbank-Operation.');
		}
	},
};