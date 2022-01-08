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
const variables_1 = require("../../constants/variables");
(0, helpers_1.createBotCommand)({
    name: 'animal',
    description: 'Get a picture of an animal.',
    group: 'fun',
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
        const option = args.join(' ').slice(0);
        const animals = ['bird', 'dog', 'cat', 'panda', 'fox', 'red panda', 'koala', 'raccoon', 'kangaroo'];
        const embed = new discord_js_1.MessageEmbed();
        embed.setColor(variables_1.default_color);
        embed.setAuthor({
            name: 'Animals 🐼',
            iconURL: variables_1.sonic_icon,
        });
        if (option.length === 0) {
            embed.setDescription(`Here are the animals that are at the zoo currently:\n• Dog\n• Cat\n• Panda\n• Fox\n• Red Panda\n• Koala\n• Raccoon\n• Kangaroo`);
        }
        else if (animals.includes(option.toLowerCase())) {
            const { body: data } = yield node_superfetch_1.default.get(`${baseUrl}animal/${option.toLowerCase().replace(' ', '_')}`);
            embed.setDescription(descs[Math.floor(Math.random() * descs.length)]);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            embed.setImage(data['image']);
        }
        else {
            embed.setDescription(`👀 Wait is this the zoo? Why don't I see \`${option}\`? Did I take the wrong path?`);
            embed.setImage(variables_1.error_404_image);
        }
        message.channel.send({ embeds: [embed] });
    }),
});
