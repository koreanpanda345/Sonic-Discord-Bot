import { MessageEmbed } from 'discord.js';
import UserDataSchema from '../../../Data/schemas/UserDataSchema';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'balloonpop',
	description: '',

	invoke: async (message, args) => {
		const user = await UserDataSchema.findOne({ user_id: message.author.id });
		user!.balloon_pop++;
		await user!.save();

		const embed = new MessageEmbed();

		embed.setAuthor('Balloon Pop 🎈', 'https://i.imgur.com/xUoqBGf.png');
		embed.setThumbnail('https://i.gifer.com/embedded/download/DGZO.gif');
		embed.setColor('#76d6ff');
		embed.addField('Total Balloons Popped:', `${user?.balloon_pop}`, true);
		embed.setDescription("You've popped a Balloon!");

		message.reply({ embeds: [embed] });
	},
});
