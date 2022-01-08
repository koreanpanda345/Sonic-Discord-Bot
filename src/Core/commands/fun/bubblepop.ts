import { MessageEmbed } from 'discord.js';
import UserDataSchema from '../../../Data/schemas/UserDataSchema';
import { default_color } from '../../constants/variables';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'bubblepop',
	description: '',

	invoke: async (message, args) => {
		const user = await UserDataSchema.findOne({ user_id: message.author.id });

		user!.bubble_pop++;
		await user?.save();

		const embed = new MessageEmbed();

		embed.setAuthor({
			name: 'Bubble Pop 🛁',
			iconURL: 'https://i.imgur.com/xUoqBGf.png',
		});
		embed.setThumbnail('https://i.imgur.com/gVsqGsA.gif');
		embed.setColor(default_color);
		embed.addField('Total Bubbles Popped:', `**${user?.bubble_pop}**`);

		embed.setDescription("You've popped a bubble!");

		message.reply({ embeds: [embed] });
	},
});
