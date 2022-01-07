import GuildSettingsSchema from '../../../Data/schemas/GuildSettingsSchema';
import { createBotCommand } from '../../utils/helpers';
//TODO: Finish making this command.
createBotCommand({
	name: 'prefix',
	description: '',

	invoke: async (message, args) => {
		let settings = await GuildSettingsSchema.findOne({ guild_id: message.guildId as string }).exec();
		if (!settings) {
			settings = await GuildSettingsSchema.create({
				guild_id: message.guildId as string,
				prefix: process.env.DISCORD_BOT_PREFIX as string,
			});
			await settings.save();
		}

		if (args[0] === 'set') {
			if (!message.member?.permissions.has('MANAGE_GUILD'))
				return message.reply('You do not have permission to do this.').then((m) => {
					setTimeout(async () => {
						await m.delete();
					}, 10000);
				});
		}
	},
});
