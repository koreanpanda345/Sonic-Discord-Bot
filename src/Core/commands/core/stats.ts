import moment from 'moment';
import { client } from '../../constants/instances';
import { createBotCommand } from '../../utils/helpers';
import 'moment-duration-format';
import { MessageEmbed, version } from 'discord.js';
createBotCommand({
	name: 'botstats',
	description: "Displays the bot's stats",

	invoke: async (message, args) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

		const embed = new MessageEmbed();

		embed.setTitle('**Stats**');
		embed.setColor(0x246ee5);
		embed.setDescription(
			`📊 __**Statistics**__\n**Users »** ${client.users.cache.size.toLocaleString()}\n**Servers »** ${client.guilds.cache.size.toLocaleString()}\n**Channels »** ${client.channels.cache.size.toLocaleString()}\n**Uptime »** ${duration}\n**Ping (Latency) »**\`${Math.round(
				client.ws.ping,
			)}\`\n\n💡 __**Bot Module Versions**__\n**Discord.js »**\`v${version}\`\n**Node.js »**\`${
				process.version
			}\``,
		);

		message.channel.send({ embeds: [embed] });
	},
});
