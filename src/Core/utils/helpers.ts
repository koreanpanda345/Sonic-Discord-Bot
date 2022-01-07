import CommandSchema from '../../Data/schemas/CommandSchema';
import { cache, client } from '../constants/instances';
import { IBotCommand } from '../interfaces/IBotCommand';
import { IBotEvent } from '../interfaces/IBotEvent';
import { IBotMonitor } from '../interfaces/IBotMonitor';

export function createBotEvent(event: IBotEvent) {
	if (cache.events.has(event.name)) return;
	if (event.disabled) return;
	if (event.once) client.once(event.name, async (...args) => await event.invoke(...args));
	else client.on(event.name, async (...args) => await event.invoke(...args));

	cache.events.set(event.name, event);
	console.log(`Registered Event ${event.name}`);
}

export function createBotMonitor(monitor: IBotMonitor) {
	if (cache.monitors.has(monitor.name)) return;

	cache.monitors.set(monitor.name, monitor);
	console.log(`Registered Monitor ${monitor.name}`);
}

export async function createBotCommand(command: IBotCommand) {
	if (cache.commands.has(command.name)) return;
	const cmd = await CommandSchema.findOne({ name: command.name });
	if (!cmd) {
		await CommandSchema.create({
			name: command.name,
			aliases: command.aliases || [],
			group: command.group || 'core',
			description: command.description || 'No description',
			usages: command.usages || [],
			enabled: !command.disabled || true,
		});
	}
	cache.commands.set(command.name, command);
	console.log(`Register Command ${command.name}`);
}
