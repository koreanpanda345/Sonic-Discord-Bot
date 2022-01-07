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
const GuildSettingsSchema_1 = __importDefault(require("../../../Data/schemas/GuildSettingsSchema"));
const instances_1 = require("../../constants/instances");
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'welcome',
    description: 'Set the image message to the channel.',
    permissions: {
        user: {
            server: ['MANAGE_GUILD'],
        },
    },
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        let settings = yield GuildSettingsSchema_1.default.findOne({ guild_id: message.guildId }).exec();
        if (!settings) {
            settings = yield GuildSettingsSchema_1.default.create({
                guild_id: message.guildId,
                prefix: process.env.DISCORD_BOT_PREFIX,
                welcome: {
                    enable: false,
                    channel_id: '',
                },
            });
            yield settings.save();
        }
        console.log(args);
        const option = args.join(' ');
        console.log(option);
        if (!option) {
            const viewEmbed = new discord_js_1.MessageEmbed();
            viewEmbed.setAuthor({
                name: `${(_a = instances_1.client.user) === null || _a === void 0 ? void 0 : _a.username} Logging`,
                iconURL: (_b = instances_1.client.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL(),
            });
            viewEmbed.setColor('RANDOM');
            viewEmbed.setDescription(`
**Welcome Message Settings**
• Enabled: ${settings.welcome.enable ? 'On' : 'Off'}
• Channel: ${((_c = message.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.get(settings.welcome.channel_id)) || '---'}`);
            viewEmbed.setFooter({
                text: 'Welcome Announcement',
            });
            viewEmbed.setTimestamp();
            message.channel.send({ embeds: [viewEmbed] });
        }
        else {
            if (option.match('set')) {
                const channel = message.mentions.channels.first();
                settings.welcome.channel_id = channel === null || channel === void 0 ? void 0 : channel.id;
                const setEmbed = new discord_js_1.MessageEmbed();
                setEmbed.setColor('RANDOM');
                setEmbed.setDescription(`Welcome channel set to: ${channel}`);
                setEmbed.setTimestamp();
                setEmbed.setFooter({
                    text: 'Welcome Channel',
                    iconURL: (_d = instances_1.client.user) === null || _d === void 0 ? void 0 : _d.displayAvatarURL(),
                });
                message.channel.send({ embeds: [setEmbed] });
            }
            else if (option.match('on')) {
                settings.welcome.enable = true;
                const onEmbed = new discord_js_1.MessageEmbed();
                onEmbed.setColor('RANDOM');
                onEmbed.setDescription(`Logging has been set **on**.`);
                onEmbed.setTimestamp();
                onEmbed.setFooter({
                    text: 'Welcome Enabled',
                    iconURL: (_e = instances_1.client.user) === null || _e === void 0 ? void 0 : _e.displayAvatarURL(),
                });
                message.channel.send({ embeds: [onEmbed] });
            }
            else if (option.match('off')) {
                settings.welcome.enable = false;
                const offEmbed = new discord_js_1.MessageEmbed();
                offEmbed.setColor('RANDOM');
                offEmbed.setDescription(`Logging has been set **off**.`);
                offEmbed.setTimestamp();
                offEmbed.setFooter({
                    text: 'Welcome Disabled',
                    iconURL: (_f = instances_1.client.user) === null || _f === void 0 ? void 0 : _f.displayAvatarURL(),
                });
                message.channel.send({ embeds: [offEmbed] });
            }
            yield settings.save();
        }
    }),
});
