"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const RadioStationSchema_1 = __importDefault(require("../../../Data/schemas/RadioStationSchema"));
const instances_1 = require("../../constants/instances");
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'radio',
    description: '',
    group: 'music',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const stations = yield RadioStationSchema_1.default.find({}).exec();
        const option = args.join(' ').slice(0);
        if (option.length === 0) {
            let page = 1;
            const pageAmount = 25;
            const pages = [];
            let str = '**';
            for (let i = 1; i < Math.floor(Math.round(50 / 25) + 1); i++) {
                for (let n = pageAmount * i - pageAmount; n < pageAmount * i; n++) {
                    str += `${n + 1}-[${stations[n].name}]\n`;
                }
                str += '**';
                pages.push(str);
                str = '**';
            }
            const embed = new discord_js_1.MessageEmbed();
            embed.setAuthor({
                name: `${(_a = instances_1.client.user) === null || _a === void 0 ? void 0 : _a.username} 📻 Radio List`,
                iconURL: (_b = instances_1.client.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL(),
            });
            embed.setThumbnail((_c = instances_1.client.user) === null || _c === void 0 ? void 0 : _c.displayAvatarURL());
            embed.setColor('GREEN');
            embed.setDescription(pages[page - 1]);
            embed.setFooter({
                text: `Page ${page} of ${pages.length} | Please choose a number to play radio.`,
            });
            return message.channel.send({ embeds: [embed] }).then((m) => {
                m.react('⏪').then(() => {
                    m.react('⏩');
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                    const forwardFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
                    const backwards = m.createReactionCollector({
                        filter: backwardsFilter,
                        time: 600000,
                    });
                    const forwards = m.createReactionCollector({
                        filter: forwardFilter,
                        time: 600000,
                    });
                    backwards.on('collect', (r) => {
                        if (page === 1)
                            return;
                        page--;
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter({
                            text: `Page ${page} of ${pages.length}`,
                        });
                        m.edit({ embeds: [embed] });
                    });
                    forwards.on('collect', (r) => {
                        if (page === pages.length)
                            return;
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
        const voiceChannel = (_d = message.member) === null || _d === void 0 ? void 0 : _d.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel first.');
        }
        if (option === 'stop') {
            if (instances_1.cache.connections.get(message.guildId)) {
                instances_1.audioManager.stop(voiceChannel);
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
        const embed = new discord_js_1.MessageEmbed();
        embed.setAuthor({
            name: (_e = instances_1.client.user) === null || _e === void 0 ? void 0 : _e.username,
        });
        console.log(num);
        console.log(stations);
        embed.setThumbnail((_f = instances_1.client.user) === null || _f === void 0 ? void 0 : _f.displayAvatarURL());
        embed.setTitle('📻 **Playing Radio**');
        embed.setColor('RANDOM');
        embed.addField(stations[num].name, 'Radio Stream 24/7');
        embed.setTimestamp();
        embed.setFooter({
            text: `Requested by ${message.author.tag}`,
        });
        const permissions = voiceChannel === null || voiceChannel === void 0 ? void 0 : voiceChannel.permissionsFor(message.client.user);
        if (!(permissions === null || permissions === void 0 ? void 0 : permissions.has('CONNECT'))) {
            return message.channel.send('No Connect permissions');
        }
        if (!(permissions === null || permissions === void 0 ? void 0 : permissions.has('SPEAK'))) {
            return message.channel.send('No Speak permissions');
        }
        if (instances_1.cache.connections.get(message.guildId))
            instances_1.audioManager.stop(voiceChannel);
        message.channel.send({ embeds: [embed] });
        instances_1.cache.connections.set(message.guildId, false);
        instances_1.audioManager.on('end', () => {
            instances_1.cache.connections.delete(message.guildId);
        });
        instances_1.audioManager
            .play(voiceChannel, stations[num].url, {
            quality: 'high',
            volume: 10,
            audiotype: 'opus',
        })
            .then((stream) => instances_1.cache.connections.set(message.guildId, true))
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
    }),
});
