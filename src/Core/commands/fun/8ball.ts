import { MessageEmbed } from 'discord.js';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: '8ball',
	description: '',

	invoke: async (message, args) => {
		if (!args[0]) return message.channel.send('**8 Ball 🎱 |** Please specifiy a question!');
		const question = args.slice().join(' ');

		const responses: string[] = [
			'Yes',
			'It is certain',
			'It is decidedly so',
			'Without a doubt',
			'Yes, definitely',
			'You may rely on it',
			'As I see it, yes',
			'Most likely',
			'Outlook good',
			'Signs point to yes',
			'Reply hazy try again',
			'Ask again later',
			'Better not tell you now',
			'Cannot predict now',
			'Concentrate and ask again',
			"Don't count on it",
			'My reply is no',
			'My sources say no',
			'Outlook not so good',
			'Very doubtful',
		];
		const result = Math.floor(Math.random() * responses.length + 0);

		const embed = new MessageEmbed();

		embed.addField(question, `${responses[result]}`);
		embed.setColor('#76d6ff');
		embed.setAuthor({
			name: '8 Ball 🎱',
			iconURL: 'https://i.imgur.com/xUoqBGf.png',
		});

		message.reply({ embeds: [embed] });
	},
});
