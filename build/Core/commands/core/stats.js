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
const moment_1 = __importDefault(require("moment"));
const instances_1 = require("../../constants/instances");
const helpers_1 = require("../../utils/helpers");
require("moment-duration-format");
const discord_js_1 = require("discord.js");
(0, helpers_1.createBotCommand)({
    name: 'botstats',
    description: "Displays the bot's stats",
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const duration = moment_1.default.duration(instances_1.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        const embed = new discord_js_1.MessageEmbed();
        embed.setTitle('**Stats**');
        embed.setColor(0x246ee5);
        embed.setDescription(`📊 __**Statistics**__\n**Users »** ${instances_1.client.users.cache.size.toLocaleString()}\n**Servers »** ${instances_1.client.guilds.cache.size.toLocaleString()}\n**Channels »** ${instances_1.client.channels.cache.size.toLocaleString()}\n**Uptime »** ${duration}\n**Ping (Latency) »**\`${Math.round(instances_1.client.ws.ping)}\`\n\n💡 __**Bot Module Versions**__\n**Discord.js »**\`v${discord_js_1.version}\`\n**Node.js »**\`${process.version}\``);
        message.channel.send({ embeds: [embed] });
    }),
});
