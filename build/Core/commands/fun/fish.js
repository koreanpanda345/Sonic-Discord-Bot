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
const FishySchema_1 = __importDefault(require("../../../Data/schemas/FishySchema"));
const UserDataSchema_1 = __importDefault(require("../../../Data/schemas/UserDataSchema"));
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'fish',
    aliases: ['fishy', 'fishing'],
    description: 'Go fishing',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args[0]) {
            const user = yield UserDataSchema_1.default.findOne({ user_id: message.author.id });
            const fishId = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishId < 5)
                rarity = 'junk';
            else if (fishId < 8)
                rarity = 'common';
            else if (fishId < 9)
                rarity = 'uncommon';
            else if (fishId < 10)
                rarity = 'rare';
            else
                rarity = 'legendary';
            const fishes = yield FishySchema_1.default.find({ rarity });
            const fish = fishes[Math.floor(Math.random() * fishes.length)];
            const worth = Math.floor(Math.random() * fish.max) + fish.min;
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor('#3891ff');
            embed.setAuthor({
                name: 'Fishing 🎣',
                iconURL: 'https://i.imgur.com/xUoqBGf.png',
            });
            embed.setDescription(`**${message.author.username}**, You caught » ${fish.symbol}. I bet it'd sell for around **$${worth}**`);
            return message.channel.send({ embeds: [embed] });
        }
        else if (args[0] === 'list' || args[0] === 'reward') {
            const embed = new discord_js_1.MessageEmbed();
            const fishes = yield FishySchema_1.default.find({}).exec();
            embed.setColor('#3891ff');
            embed.setAuthor({
                name: 'Fishing 🎣',
                iconURL: 'https://i.imgur.com/xUoqBGf.png',
            });
            const rarity_emoji = {
                junk: '',
                common: '',
                uncommon: '',
                rare: '',
                legendary: '',
            };
            const rarity_reward = {
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
                rarity_emoji[fish.rarity] += fish.symbol;
                if (rarity_reward[fish.rarity].max < fish.max)
                    rarity_reward[fish.rarity].max = fish.max;
                if (rarity_reward[fish.rarity].min > fish.min)
                    rarity_reward[fish.rarity].min = fish.min;
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
    }),
});
