import { MessageEmbed } from 'discord.js';
import FishySchema from '../../../Data/schemas/FishySchema';
import UserDataSchema from '../../../Data/schemas/UserDataSchema';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'fish',
	aliases: ['fishy', 'fishing'],
	description: 'Go fishing',

	invoke: async (message, args) => {
		if (!args[0]) {
			const user = await UserDataSchema.findOne({ user_id: message.author.id });
			const fishId = Math.floor(Math.random() * 10) + 1;
			let rarity;

			if (fishId < 5) rarity = 'junk';
			else if (fishId < 8) rarity = 'common';
			else if (fishId < 9) rarity = 'uncommon';
			else if (fishId < 10) rarity = 'rare';
			else rarity = 'legendary';
			const fishes = await FishySchema.find({ rarity });
			const fish = fishes[Math.floor(Math.random() * fishes.length)];
			const worth = Math.floor(Math.random() * fish!.max) + fish!.min;

			const embed = new MessageEmbed();

			embed.setColor('#3891ff');
			embed.setAuthor({
				name: 'Fishing 🎣',
				iconURL: 'https://i.imgur.com/xUoqBGf.png',
			});
			embed.setDescription(
				`**${message.author.username}**, You caught » ${fish.symbol}. I bet it'd sell for around **$${worth}**`,
			);

			return message.channel.send({ embeds: [embed] });
		} else if (args[0] === 'list' || args[0] === 'reward') {
			const embed = new MessageEmbed();

			const fishes = await FishySchema.find({}).exec();

			embed.setColor('#3891ff');
			embed.setAuthor({
				name: 'Fishing 🎣',
				iconURL: 'https://i.imgur.com/xUoqBGf.png',
			});
			const rarity_emoji: {
				[key: string]: string;
			} = {
				junk: '',
				common: '',
				uncommon: '',
				rare: '',
				legendary: '',
			};

			const rarity_reward: {
				[key: string]: {
					max: number;
					min: number;
				};
			} = {
				junk: {
					max: 0,
					min: 0,
				},
				common: {
					max: 0,
					min: 0,
				},
				uncommon: {
					max: 0,
					min: 0,
				},
				rare: {
					max: 0,
					min: 0,
				},
				legendary: {
					max: 0,
					min: 0,
				},
			};

			for (const fish of fishes) {
				rarity_emoji[fish!.rarity as string] += fish!.symbol;
				if (rarity_reward[fish!.rarity as string].max < fish!.max)
					rarity_reward[fish!.rarity as string].max = fish!.max;
				if (rarity_reward[fish!.rarity as string].min > fish!.min)
					rarity_reward[fish!.rarity as string].min = fish!.min;
			}
			embed.setDescription(`
\`\`\`
${rarity_emoji.junk} Junk\t  :: max reward: ${rarity_reward.junk.max}, min reward: ${rarity_reward.junk.min}

${rarity_emoji.common} Common\t\t :: max reward: ${rarity_reward.common.max}, min reward: ${rarity_reward.common.min}

${rarity_emoji.uncommon} Uncommon  :: max reward: ${rarity_reward.uncommon.max}, min reward: ${rarity_reward.uncommon.min}

${rarity_emoji.rare} Rare\t  :: max reward: ${rarity_reward.rare.max}, min reward: ${rarity_reward.rare.min}

${rarity_emoji.legendary} Legendary :: max reward: ${rarity_reward.legendary.max}, min reward: ${rarity_reward.legendary.min}
\`\`\`
**All rewards are random from max/min**`);

			message.channel.send({ embeds: [embed] });
		}
	},
});
