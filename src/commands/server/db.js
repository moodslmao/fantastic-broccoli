const { SlashCommandBuilder } = require('@discordjs/builders');
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
					//Here is my db operation to create the db
                    break;
            }
		}
		catch (error) {
			console.error('Error while executing db operation:', error);
			await interaction.reply('There was an error executing the db operation.');
		}
	},
};