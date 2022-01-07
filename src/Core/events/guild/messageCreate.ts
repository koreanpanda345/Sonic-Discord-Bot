import { Message } from 'discord.js';
import { cache } from '../../constants/instances';
import { createBotEvent } from '../../utils/helpers';

createBotEvent({
	name: 'messageCreate',
	invoke: async (message: Message) => {
		if (message.author.bot) return;
		const commandHandler = cache.monitors.get('command_handler');
		await commandHandler?.invoke(message);
	},
});
