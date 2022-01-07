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
const helpers_1 = require("../../utils/helpers");
const skia_1 = require("canvas-constructor/skia");
const GuildSettingsSchema_1 = __importDefault(require("../../../Data/schemas/GuildSettingsSchema"));
(0, helpers_1.createBotEvent)({
    name: 'guildMemberAdd',
    invoke: (member) => __awaiter(void 0, void 0, void 0, function* () {
        const link = member.user.displayAvatarURL();
        function join() {
            return __awaiter(this, void 0, void 0, function* () {
                const imageUrlRegex = /\?size=2048$/g;
                const namam = member.user.username;
                const jadim = namam.length > 12 ? namam.substring(0, 10) + '...' : namam;
                const total = member.guild.memberCount;
                return new skia_1.Canvas(1360, 768)
                    .printRectangle(0, 0, 1360, 768)
                    .save()
                    .printImage((0, skia_1.resolveImage)(link), 0, 0, 1360, 768)
                    .setColor('#699edb')
                    .setTextAlign('center')
                    .setTextFont('bold 50px Tahoma')
                    .setColor('#ffffff')
                    .printText(`${jadim}#${member.user.discriminator}`, 300, 450)
                    .setColor('#ffffff')
                    .restore()
                    .printRoundedImage((0, skia_1.resolveImage)(member.displayAvatarURL()), 57, 110, 256, 256, 128)
                    .toBuffer('png');
            });
        }
        const settings = yield GuildSettingsSchema_1.default.findOne({ guild_id: member.guild.id }).exec();
        if (!settings)
            return;
        if (!settings.welcome.enable)
            return;
        const channel = member.guild.channels.cache.get(settings.welcome.channel_id);
        if (!channel)
            return;
        channel.send({ files: [new discord_js_1.MessageAttachment(yield join(), 'sonic-join.png')] });
    }),
});
