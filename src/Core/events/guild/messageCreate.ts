import { Message } from 'discord.js';
import UserDataSchema from '../../../Data/schemas/UserDataSchema';
import { cache } from '../../constants/instances';
import { createBotEvent } from '../../utils/helpers';

createBotEvent({
	name: 'messageCreate',
	invoke: async (message: Message) => {
		if (message.author.bot) return;

		let user = await UserDataSchema.findOne({ user_id: message.author.id });

		if (!user) {
			user = await UserDataSchema.create({
				user_id: message.author.id,
				balloon_pop: 0,
				bubble_pop: 0,
			});

			await user.save();
		}
		if (typeof user.bubble_pop === 'undefined') user.bubble_pop = 0;
		if (typeof user.fishy === 'undefined') user.fishy = 0;
		if (typeof user.balance === 'undefined') user.balance = 0;

		await user.save();

		const commandHandler = cache.monitors.get('command_handler');
		await commandHandler?.invoke(message);
	},
});
