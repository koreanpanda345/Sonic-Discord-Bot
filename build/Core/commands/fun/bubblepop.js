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
const UserDataSchema_1 = __importDefault(require("../../../Data/schemas/UserDataSchema"));
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'bubblepop',
    description: '',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserDataSchema_1.default.findOne({ user_id: message.author.id });
        user.bubble_pop++;
        yield (user === null || user === void 0 ? void 0 : user.save());
        const embed = new discord_js_1.MessageEmbed();
        embed.setAuthor({
            name: 'Bubble Pop 🛁',
            iconURL: 'https://i.imgur.com/xUoqBGf.png',
        });
        embed.setThumbnail('https://i.imgur.com/gVsqGsA.gif');
        embed.setColor('#76d6ff');
        embed.addField('Total Bubbles Popped:', `**${user === null || user === void 0 ? void 0 : user.bubble_pop}**`);
        embed.setDescription("You've popped a bubble!");
        message.reply({ embeds: [embed] });
    }),
});
