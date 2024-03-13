const { SlashCommandBuilder } = require('@discordjs/builders');

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
                    break;
            }
		}
		catch (error) {
			console.error('Fehler bei der Datenbankoperation:', error);
			await interaction.reply('Es gab einen Fehler beim ausführen der Datenbank-Operation.');
		}
	},
};