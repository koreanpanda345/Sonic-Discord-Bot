import { createBotCommand } from '../../utils/helpers';
import superagent from 'node-superfetch';
import { EmbedType } from 'discord-api-types';
import { MessageEmbed } from 'discord.js';
createBotCommand({
	name: 'cat',
	description: '',

	invoke: async (message, args) => {
		const descs: string[] = [
			'A big cutie!',
			'A small cutie!',
			'OwO whats this?',
			'UwU so adorable...',
			'Literally shooketh',
			'if (this.isCute) {\n\tdie()\n}',
		];

		const baseUrl = 'https://some-random-api.ml/';

		const { body: data } = await superagent.get(`${baseUrl}animal/cat`);

		const embed = new MessageEmbed();

		embed.setDescription(descs[Math.floor(Math.random() * descs.length)]);

		embed.setColor('#76d6ff');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		embed.setImage(data['image']);

		message.channel.send({ embeds: [embed] });
	},
});
