import { MessageEmbed } from 'discord.js';
import CommandGroupSchema from '../../../Data/schemas/CommandGroupSchema';
import CommandSchema from '../../../Data/schemas/CommandSchema';
import { client } from '../../constants/instances';
import { error_404_image } from '../../constants/variables';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'help',
	aliases: ['command', 'commands'],
	description: '',
	group: 'bot',
	usages: ['*help'],

	invoke: async (message, args) => {
		const bicon = client.user?.displayAvatarURL();
		const options = args.join(' ').slice(0);
		const embed = new MessageEmbed();
		const commands = await CommandSchema.find({}).exec();
		embed.setAuthor({
			name: client.user?.username as string,
		});
		embed.setThumbnail(bicon as string);
		embed.setColor('RANDOM');
		embed.setTimestamp();
		embed.setFooter({
			text: `Requested by ${message.author.tag}`,
		});
		const prefix = '*';
		const groups = await CommandGroupSchema.find({}).exec();
		const groupNames = groups.map((x) => x.name);
		const actions = groups.map((x) => x.name.toLowerCase());
		if (!options) {
			// Show the command groups
			embed.setTitle('My Commands');
			embed.setDescription('If a command group is crossed out, then it means that it is disabled.');
			for (const group of groups) {
				embed.addField(
					`${group!.disabled ? '~~' : ''}${prefix}help ${group.name.toLowerCase()}${
						group!.disabled ? '~~' : ''
					} | ${group!.emoji}`,
					`${group!.disabled ? '~~' : ''}${group.description || 'No description'}${
						group!.disabled ? '~~' : ''
					}`,
				);
			}
		} else if (actions.includes(options.toLowerCase())) {
			const group = groups.find((x) => x.name.toLowerCase() === options.toLowerCase());
			embed.setTitle(`**${group!.emoji} ${group!.name} Commands ${group!.emoji}**`);

			const filter = commands.filter((x) => x.group.toLowerCase() === group!.name.toLowerCase());
			if (filter.length === 0) {
				embed.setDescription("🦗 *cricket noises*\n There doesn't seem to be anything here. 🦗");
			}
			for (const command of filter) {
				embed.addField(
					`${prefix}${command.name}`,
					`${command.description}${command.usages.length > 0 ? ` (Usage) ${command.usages.join(', ')}` : ''}`,
				);
			}
		} else {
			embed.setTitle('Oh this is awkward....');
			embed.setDescription(
				`There doesn't seem to be a command group called ${options}. Maybe you misspelt it, or something.\n` +
					`But since you are here, watch me beat this game.`,
			);
			embed.setImage(error_404_image);
		}
		message.channel.send({ embeds: [embed] });
	},
});
