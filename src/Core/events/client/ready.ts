import { createBotEvent } from '../../utils/helpers';

createBotEvent({
	name: 'ready',
	once: true,

	invoke: async () => {
		console.log('Bot is ready!');
	},
});
