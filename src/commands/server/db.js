const { SlashCommandBuilder } = require('@discordjs/builders');
const dbService = require('../../services/dbService');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('db')
		.setDescription('Db operations.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('create')
                .setDescription('Creates a new database with all tables.'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
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
			console.error('Error while executing db operation:', error);
			await interaction.reply('There was an error executing the db operation.');
		}
	},
};