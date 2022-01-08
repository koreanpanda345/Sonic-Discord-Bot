import { MessageEmbed } from 'discord.js';
import CommandGroupSchema from '../../../Data/schemas/CommandGroupSchema';
import CommandSchema from '../../../Data/schemas/CommandSchema';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'cmd',
	description: 'Fixing command data command',
	group: 'dev',
	invoke: async (message, args) => {
		if (message.author.id !== '304446682081525772') return;
		const commands = await CommandSchema.find().exec();
		const groups = await CommandGroupSchema.find().exec();
		const embed = new MessageEmbed();
		if (args.length === 0) {
			embed.setTitle('Commands');
			let str = '';
			for (const group of groups) {
				str += `${group!.name} - ${group!.disabled ? 'Disabled' : 'Enabled'}\n`;
			}
			embed.addField(`Command Groups`, str, true);
			str = '';
			for (const command of commands) {
				str += `${command!.name} - ${command!.enabled ? 'Enabled' : 'Disabled'}\n`;
			}
			embed.addField('Commands', str, true);
			embed.setColor('RANDOM');
			return message.channel.send({ embeds: [embed] });
		}

		if (args[0] === 'disable') {
			const group = groups.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
			const command = commands.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
			if (group) {
				group.disabled = true;
				await group.save();
				return message.channel.send(`Command group \`${group.name}\` has been disabled`);
			} else if (command) {
				command.enabled = false;
				await command.save();
				return message.channel.send(`Command \`${command.name}\` has been disabled`);
			} else {
				return message.channel.send(`${args[1]} doesn't exist`);
			}
		} else if (args[0] === 'enable') {
			const group = groups.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
			const command = commands.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
			if (group) {
				group.disabled = false;
				await group.save();
				return message.channel.send(`Command group \`${group.name}\` has been enabled`);
			} else if (command) {
				command.enabled = true;
				await command.save();
				return message.channel.send(`Command \`${command.name}\` has been enabled`);
			} else {
				return message.channel.send(`${args[1]} doesn't exist`);
			}
		}
	},
});
