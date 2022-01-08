import { createBotCommand } from '../../utils/helpers';
import superagent from 'node-superfetch';
import { MessageEmbed } from 'discord.js';
import { default_color, error_404_image, sonic_icon } from '../../constants/variables';
createBotCommand({
	name: 'animal',
	description: 'Get a picture of an animal.',
	group: 'fun',
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

		const option = args.join(' ').slice(0);

		const animals: string[] = ['bird', 'dog', 'cat', 'panda', 'fox', 'red panda', 'koala', 'raccoon', 'kangaroo'];
		const embed = new MessageEmbed();
		embed.setColor(default_color);
		embed.setAuthor({
			name: 'Animals 🐼',
			iconURL: sonic_icon,
		});
		if (option.length === 0) {
			embed.setDescription(
				`Here are the animals that are at the zoo currently:\n• Dog\n• Cat\n• Panda\n• Fox\n• Red Panda\n• Koala\n• Raccoon\n• Kangaroo`,
			);
		} else if (animals.includes(option.toLowerCase())) {
			const { body: data } = await superagent.get(`${baseUrl}animal/${option.toLowerCase().replace(' ', '_')}`);

			embed.setDescription(descs[Math.floor(Math.random() * descs.length)]);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			embed.setImage(data['image']);
		} else {
			embed.setDescription(`👀 Wait is this the zoo? Why don't I see \`${option}\`? Did I take the wrong path?`);
			embed.setImage(error_404_image);
		}

		message.channel.send({ embeds: [embed] });
	},
});
