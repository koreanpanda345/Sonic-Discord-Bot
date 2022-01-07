import { createBotCommand } from '../../utils/helpers';

const ban_messages = [
	'Hehe, see you next time!',
	'bye bye!',
	'You are not belong in here!',
	'See you again',
	'cya',
	'Sayōnara!',
];

createBotCommand({
	name: 'ban',
	description: 'ban member from the server',
	usages: ['ban <@user or id> [reason]', '*ban @koreanpanda345 for being lazy.'],
	permissions: {
		self: {
			server: ['BAN_MEMBERS'],
		},
		user: {
			server: ['BAN_MEMBERS'],
		},
	},
	invoke: async (message, args) => {
		try {
			const reason = args.slice(1).join(' ');
			if (message.mentions.users.size === 0) return message.reply('Please tag the user you would like to ban.');
			if (!message.mentions.members?.first()?.bannable)
				return message.reply(`**${message.mentions.users.first()?.username} is too priveledged for me to ban.`);

			const member = message.mentions.members.first();

			member?.send(
				`You have been banned by **${message.author.tag}** from **${message.guild?.name}** becase:\n${
					reason || 'No reason'
				}`,
			);

			await member?.ban({ reason: reason || 'No reason' }).then((m) => {
				message.reply(
					`**${member.user.username} has been banned from **${message.guild?.name}**. ${
						ban_messages[Math.floor(Math.random() * (ban_messages.length - 1))]
					}`,
				);
			});
		} catch (error) {
			message.reply(
				`Either I am unable to ban **${
					message.mentions.users.first()?.username
				},** or I do not have permissionto ban members.`,
			);
		}
	},
});
