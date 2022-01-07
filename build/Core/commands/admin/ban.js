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
const helpers_1 = require("../../utils/helpers");
const ban_messages = [
    'Hehe, see you next time!',
    'bye bye!',
    'You are not belong in here!',
    'See you again',
    'cya',
    'Sayōnara!',
];
(0, helpers_1.createBotCommand)({
    name: 'ban',
    description: 'ban member from the server',
    usages: ['ban <@user or id> [reason]', '*ban @koreanpanda345 for being lazy.'],
    permissions: {
        self: {
            server: ['BAN_MEMBERS'],
        },
        user: {
            server: ['BAN_MEMBERS'],
        },
    },
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const reason = args.slice(1).join(' ');
            if (message.mentions.users.size === 0)
                return message.reply('Please tag the user you would like to ban.');
            if (!((_b = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.bannable))
                return message.reply(`**${(_c = message.mentions.users.first()) === null || _c === void 0 ? void 0 : _c.username} is too priveledged for me to ban.`);
            const member = message.mentions.members.first();
            member === null || member === void 0 ? void 0 : member.send(`You have been banned by **${message.author.tag}** from **${(_d = message.guild) === null || _d === void 0 ? void 0 : _d.name}** becase:\n${reason || 'No reason'}`);
            yield (member === null || member === void 0 ? void 0 : member.ban({ reason: reason || 'No reason' }).then((m) => {
                var _a;
                message.reply(`**${member.user.username} has been banned from **${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}**. ${ban_messages[Math.floor(Math.random() * (ban_messages.length - 1))]}`);
            }));
        }
        catch (error) {
            message.reply(`Either I am unable to ban **${(_e = message.mentions.users.first()) === null || _e === void 0 ? void 0 : _e.username},** or I do not have permissionto ban members.`);
        }
    }),
});
