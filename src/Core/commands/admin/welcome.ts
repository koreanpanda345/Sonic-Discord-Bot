import { MessageEmbed } from 'discord.js';
import GuildSettingsSchema from '../../../Data/schemas/GuildSettingsSchema';
import { client } from '../../constants/instances';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'welcome',
	description: 'Set the image message to the channel.',
	permissions: {
		user: {
			server: ['MANAGE_GUILD'],
		},
	},
	invoke: async (message, args) => {
		let settings = await GuildSettingsSchema.findOne({ guild_id: message.guildId }).exec();

		if (!settings) {
			settings = await GuildSettingsSchema.create({
				guild_id: message.guildId,
				prefix: process.env.DISCORD_BOT_PREFIX,
				welcome: {
					enable: false,
					channel_id: '',
				},
			});

			await settings.save();
		}
		console.log(args);
		const option = args.join(' ');
		console.log(option);
		if (!option) {
			const viewEmbed = new MessageEmbed();
			viewEmbed.setAuthor({
				name: `${client.user?.username} Logging`,
				iconURL: client.user?.displayAvatarURL(),
			});
			viewEmbed.setColor('RANDOM');
			viewEmbed.setDescription(`
**Welcome Message Settings**
• Enabled: ${settings.welcome.enable ? 'On' : 'Off'}
• Channel: ${message.guild?.channels.cache.get(settings.welcome.channel_id) || '---'}`);
			viewEmbed.setFooter({
				text: 'Welcome Announcement',
			});
			viewEmbed.setTimestamp();
			message.channel.send({ embeds: [viewEmbed] });
		} else {
			if (option.match('set')) {
				const channel = message.mentions.channels.first();
				settings.welcome.channel_id = channel?.id as string;

				const setEmbed = new MessageEmbed();

				setEmbed.setColor('RANDOM');
				setEmbed.setDescription(`Welcome channel set to: ${channel}`);
				setEmbed.setTimestamp();
				setEmbed.setFooter({
					text: 'Welcome Channel',
					iconURL: client.user?.displayAvatarURL(),
				});

				message.channel.send({ embeds: [setEmbed] });
			} else if (option.match('on')) {
				settings.welcome.enable = true;

				const onEmbed = new MessageEmbed();

				onEmbed.setColor('RANDOM');
				onEmbed.setDescription(`Logging has been set **on**.`);
				onEmbed.setTimestamp();
				onEmbed.setFooter({
					text: 'Welcome Enabled',
					iconURL: client.user?.displayAvatarURL(),
				});

				message.channel.send({ embeds: [onEmbed] });
			} else if (option.match('off')) {
				settings.welcome.enable = false;

				const offEmbed = new MessageEmbed();

				offEmbed.setColor('RANDOM');
				offEmbed.setDescription(`Logging has been set **off**.`);
				offEmbed.setTimestamp();
				offEmbed.setFooter({
					text: 'Welcome Disabled',
					iconURL: client.user?.displayAvatarURL(),
				});

				message.channel.send({ embeds: [offEmbed] });
			}

			await settings.save();
		}
	},
});
