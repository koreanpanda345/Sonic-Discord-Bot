import { Message, PermissionResolvable } from 'discord.js';

export interface IBotCommand {
	name: string;
	aliases?: string[];
	description?: string;
	group?: string;
	usages?: string | string[];

	disabled?: boolean;

	permissions?: {
		self?: {
			server?: PermissionResolvable[];
			channel?: PermissionResolvable[];
		};
		user?: {
			server?: PermissionResolvable[];
			channel?: PermissionResolvable[];
		};
	};

	invoke: (message: Message, args: string[]) => Promise<unknown>;
}
