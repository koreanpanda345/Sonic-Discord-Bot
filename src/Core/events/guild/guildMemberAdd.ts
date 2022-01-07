import { GuildMember, MessageAttachment, TextChannel } from 'discord.js';
import { createBotEvent } from '../../utils/helpers';
import superagent from 'node-superfetch';
import { Canvas, resolveImage } from 'canvas-constructor/skia';
import GuildSettingsSchema from '../../../Data/schemas/GuildSettingsSchema';
createBotEvent({
	name: 'guildMemberAdd',

	invoke: async (member: GuildMember) => {
		const link = member.user.displayAvatarURL();

		async function join() {
			const imageUrlRegex = /\?size=2048$/g;
			const namam = member.user.username;
			const jadim = namam.length > 12 ? namam.substring(0, 10) + '...' : namam;
			const total = member.guild.memberCount;

			return new Canvas(1360, 768)
				.printRectangle(0, 0, 1360, 768)
				.save()
				.printImage(resolveImage(link), 0, 0, 1360, 768)
				.setColor('#699edb')
				.setTextAlign('center')
				.setTextFont('bold 50px Tahoma')
				.setColor('#ffffff')
				.printText(`${jadim}#${member.user.discriminator}`, 300, 450)
				.setColor('#ffffff')
				.restore()
				.printRoundedImage(resolveImage(member.displayAvatarURL()), 57, 110, 256, 256, 128)
				.toBuffer('png');
		}

		const settings = await GuildSettingsSchema.findOne({ guild_id: member.guild.id }).exec();

		if (!settings) return;

		if (!settings.welcome.enable) return;

		const channel = member.guild.channels.cache.get(settings.welcome.channel_id);
		if (!channel) return;
		(channel as TextChannel).send({ files: [new MessageAttachment(await join(), 'sonic-join.png')] });
	},
});
