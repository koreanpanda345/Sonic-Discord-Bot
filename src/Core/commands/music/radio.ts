import { MessageEmbed, MessageReaction, ReactionEmoji, User, VoiceChannel } from 'discord.js';
import { AudioManager, Connection } from 'discordaudio';
import { connect } from 'http2';
import RadioStationSchema from '../../../Data/schemas/RadioStationSchema';
import { audioManager, cache, client } from '../../constants/instances';
import { createBotCommand } from '../../utils/helpers';

createBotCommand({
	name: 'radio',
	description: '',
	group: 'music',

	invoke: async (message, args) => {
		const stations = await RadioStationSchema.find({}).exec();

		const option = args.join(' ').slice(0);
		if (option.length === 0) {
			let page = 1;
			const pageAmount = 25;
			const pages: string[] = [];
			let str = '**';
			for (let i = 1; i < Math.floor(Math.round(50 / 25) + 1); i++) {
				for (let n = pageAmount * i - pageAmount; n < pageAmount * i; n++) {
					str += `${n + 1}-[${stations[n].name}]\n`;
				}
				str += '**';
				pages.push(str);
				str = '**';
			}

			const embed = new MessageEmbed();
			embed.setAuthor({
				name: `${client.user?.username} 📻 Radio List`,
				iconURL: client.user?.displayAvatarURL() as string,
			});
			embed.setThumbnail(client.user?.displayAvatarURL() as string);
			embed.setColor('GREEN');
			embed.setDescription(pages[page - 1]);
			embed.setFooter({
				text: `Page ${page} of ${pages.length} | Please choose a number to play radio.`,
			});

			return message.channel.send({ embeds: [embed] }).then((m) => {
				m.react('⏪').then(() => {
					m.react('⏩');

					const backwardsFilter = (reaction: MessageReaction, user: User) =>
						reaction.emoji.name === '⏪' && user.id === message.author.id;
					const forwardFilter = (reaction: MessageReaction, user: User) =>
						reaction.emoji.name === '⏩' && user.id === message.author.id;

					const backwards = m.createReactionCollector({
						filter: backwardsFilter,
						time: 600000,
					});
					const forwards = m.createReactionCollector({
						filter: forwardFilter,
						time: 600000,
					});

					backwards.on('collect', (r) => {
						if (page === 1) return;
						page--;
						embed.setDescription(pages[page - 1]);
						embed.setFooter({
							text: `Page ${page} of ${pages.length}`,
						});
						m.edit({ embeds: [embed] });
					});

					forwards.on('collect', (r) => {
						if (page === pages.length) return;
						page++;
						embed.setDescription(pages[page - 1]);
						embed.setFooter({
							text: `Page ${page} of ${pages.length}`,
						});
						m.edit({ embeds: [embed] });
					});
				});
			});
		}
		const voiceChannel = message.member?.voice.channel;
		if (!voiceChannel) {
			return message.channel.send('You need to be in a voice channel first.');
		}
		if (option === 'stop') {
			if (cache.connections.get(message.guildId as string)) {
				audioManager.stop(voiceChannel as VoiceChannel);
				return message.channel.send('Stopped the radio.');
			}
		}
		if (isNaN(Number(option))) {
			return message.channel.send('Please provide the id of the station.');
		}
		const num = Number(option) - 1;

		if (num > stations.length) {
			return message.channel.send("Sorry, but there isn't that many channels.");
		}
		const embed = new MessageEmbed();

		embed.setAuthor({
			name: client.user?.username as string,
		});
		console.log(num);
		console.log(stations);
		embed.setThumbnail(client.user?.displayAvatarURL() as string);
		embed.setTitle('📻 **Playing Radio**');
		embed.setColor('RANDOM');
		embed.addField(stations[num].name, 'Radio Stream 24/7');
		embed.setTimestamp();
		embed.setFooter({
			text: `Requested by ${message.author.tag}`,
		});

		const permissions = voiceChannel?.permissionsFor(message.client.user!);

		if (!permissions?.has('CONNECT')) {
			return message.channel.send('No Connect permissions');
		}

		if (!permissions?.has('SPEAK')) {
			return message.channel.send('No Speak permissions');
		}

		if (cache.connections.get(message.guildId as string)) audioManager.stop(voiceChannel as VoiceChannel);

		message.channel.send({ embeds: [embed] });
		cache.connections.set(message.guildId as string, false);
		audioManager.on('end', () => {
			cache.connections.delete(message.guildId as string);
		});
		audioManager
			.play(voiceChannel as VoiceChannel, stations[num].url, {
				quality: 'high',
				volume: 10,
				audiotype: 'opus',
			})
			.then((stream) => cache.connections.set(message.guildId as string, true))
			.catch(console.log);
		// const connection = new Connection(voiceChannel as VoiceChannel, {
		// 	selfDeaf: true,
		// 	selfMute: false,
		// });
		// console.log(stations[num].url);
		// connection
		// 	.play(stations[num].url as string, {
		// 		noListeners: 'play',
		// 		volume: 5,
		// 	})
		// 	.then((stream) => console.log(`Playing ${stream}`))
		// 	.catch((error) => console.error(error));
	},
});
