import { Client, Collection, Intents } from 'discord.js';
import { AudioManager } from 'discordaudio';
import { IBotCommand } from '../interfaces/IBotCommand';
import { IBotEvent } from '../interfaces/IBotEvent';
import { IBotMonitor } from '../interfaces/IBotMonitor';

export const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

export const cache = {
	commands: new Collection<string, IBotCommand>(),
	events: new Collection<string, IBotEvent>(),
	monitors: new Collection<string, IBotMonitor>(),
	connections: new Collection<string, boolean>(),
};

export const audioManager = new AudioManager();
