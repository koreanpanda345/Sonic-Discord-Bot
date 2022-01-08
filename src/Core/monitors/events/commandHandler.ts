import { GuildMember, Message, MessageEmbed } from 'discord.js';
import CommandGroupSchema from '../../../Data/schemas/CommandGroupSchema';
import CommandSchema from '../../../Data/schemas/CommandSchema';
import { cache, client } from '../../constants/instances';
import { sonic_icon } from '../../constants/variables';
import { IBotCommand } from '../../interfaces/IBotCommand';
import { createBotMonitor } from '../../utils/helpers';

function parsePrefix(guildId: string | null) {
	const prefix = process.env.DISCORD_BOT_PREFIX;

	return prefix || process.env.DISCORD_BOT_PREFIX;
}

function parseCommand(name: string) {
	return cache.commands.get(name) || cache.commands.find((c) => c.aliases! && c.aliases.includes(name));
}

function validatePermissions(command: IBotCommand, message: Message) {
	if (command.permissions) {
		if (command.permissions.self) {
			if (command.permissions.self.server)
				if (!message.guild?.me?.permissions.has(command.permissions.self.server)) return false;
			if (command.permissions.self?.channel)
				if (!message.guild?.me?.permissionsIn(message.channelId).has(command.permissions.self.channel))
					return false;
		}
		if (command.permissions.user) {
			if (command.permissions.user.server)
				if (!message.member?.permissions.has(command.permissions.user.server)) return false;
			if (command.permissions.user.channel)
				if (!message.member?.permissionsIn(message.channelId).has(command.permissions.user.channel))
					return false;
		}
	}

	return true;
}

async function getCommandData(name: string) {
	let command = await CommandSchema.findOne({ name });

	if (!command) command = await CommandSchema.findOne().where('aliases').all([name]);
	if (!command) return false;
	else return command;
}

async function getDisabledGroups() {
	const groups = await CommandGroupSchema.find({}).where('disabled').all([true]);
	return groups.map((x) => x.name.toLowerCase());
}

createBotMonitor({
	name: 'command_handler',
	invoke: async (message: Message) => {
		const prefix = parsePrefix(message.guildId);

		if (
			!message.content
				.toLowerCase()
				.trim()
				.startsWith(prefix as string)
		)
			return;

		const args = message.content.slice(prefix!.length).trim().split(' ');
		await getDisabledGroups();
		const commandName = args.shift()?.toLowerCase();
		const data = await getCommandData(commandName as string);

		if (!data) return;

		if (!data.enabled) {
			const embed = new MessageEmbed();
			embed.setAuthor({
				name: client.user?.username as string,
				iconURL: sonic_icon,
			});
			embed.setColor('ORANGE');
			embed.setTitle('This command is disabled!');
			embed.setDescription(
				`Command ${data.name} has been disabled either because it has problems, or it is under mainatance.`,
			);

			return message.reply({ embeds: [embed] });
		}

		const disabled = await getDisabledGroups();
		if (disabled.includes(data!.group.toLowerCase())) {
			const embed = new MessageEmbed();
			embed.setAuthor({
				name: client.user?.username as string,
				iconURL: sonic_icon,
			});
			embed.setColor('ORANGE');
			embed.setTitle('This command is disabled!');
			embed.setDescription(
				`The command group \`${
					data!.group
				}\` is currently disabled. Any command belonging to it is disabled either to prevent any further damage to the bot, or it is deprecated.`,
			);

			return message.reply({ embeds: [embed] });
		}
		const command = parseCommand(data!.name);
		// Since undefined and null are both falsy, it will return false, if the command doesn't exist.
		if (!command) return;
		const validated = validatePermissions(command, message);
		if (!validatePermissions) {
			return message.reply(
				'You are missing permissions to perform this action. Use the help command to find what permissions this command requires.',
			);
		}
		try {
			await command.invoke(message, args);
		} catch (error) {
			console.error(error);
		}
	},
});
