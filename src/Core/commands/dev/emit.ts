import { GuildMember } from 'discord.js';
import { client } from '../../constants/instances';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'emit',
	invoke: async (message, args) => {
		client.emit('guildMemberAdd', message.member as GuildMember);
	},
});
