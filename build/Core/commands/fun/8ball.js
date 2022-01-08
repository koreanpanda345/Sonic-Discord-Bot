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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const variables_1 = require("../../constants/variables");
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: '8ball',
    description: '',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args[0])
            return message.channel.send('**8 Ball 🎱 |** Please specifiy a question!');
        const question = args.slice().join(' ');
        const responses = [
            'Yes',
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes, definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            "Don't count on it",
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
        ];
        const result = Math.floor(Math.random() * responses.length + 0);
        const embed = new discord_js_1.MessageEmbed();
        embed.addField(question, `${responses[result]}`);
        embed.setColor('#76d6ff');
        embed.setAuthor({
            name: '8 Ball 🎱',
            iconURL: variables_1.sonic_icon,
        });
        message.reply({ embeds: [embed] });
    }),
});
