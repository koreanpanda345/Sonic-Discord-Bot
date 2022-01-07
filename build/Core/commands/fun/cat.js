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
const helpers_1 = require("../../utils/helpers");
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const discord_js_1 = require("discord.js");
(0, helpers_1.createBotCommand)({
    name: 'cat',
    description: '',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const descs = [
            'A big cutie!',
            'A small cutie!',
            'OwO whats this?',
            'UwU so adorable...',
            'Literally shooketh',
            'if (this.isCute) {\n\tdie()\n}',
        ];
        const baseUrl = 'https://some-random-api.ml/';
        const { body: data } = yield node_superfetch_1.default.get(`${baseUrl}animal/cat`);
        const embed = new discord_js_1.MessageEmbed();
        embed.setDescription(descs[Math.floor(Math.random() * descs.length)]);
        embed.setColor('#76d6ff');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        embed.setImage(data['image']);
        message.channel.send({ embeds: [embed] });
    }),
});
