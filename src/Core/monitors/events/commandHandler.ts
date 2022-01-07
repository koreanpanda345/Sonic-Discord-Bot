import { GuildMember, Message } from 'discord.js';
import CommandSchema from '../../../Data/schemas/CommandSchema';
import { cache } from '../../constants/instances';
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
	console.debug(command);
	if (!command) return false;
	else return command;
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

		const commandName = args.shift()?.toLowerCase();
		const data = await getCommandData(commandName as string);

		if (!data) return;

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
