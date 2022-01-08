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
const CommandGroupSchema_1 = __importDefault(require("../../../Data/schemas/CommandGroupSchema"));
const CommandSchema_1 = __importDefault(require("../../../Data/schemas/CommandSchema"));
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'cmd',
    description: 'Fixing command data command',
    group: 'dev',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.id !== '304446682081525772')
            return;
        const commands = yield CommandSchema_1.default.find().exec();
        const groups = yield CommandGroupSchema_1.default.find().exec();
        const embed = new discord_js_1.MessageEmbed();
        if (args.length === 0) {
            embed.setTitle('Commands');
            let str = '';
            for (const group of groups) {
                str += `${group.name} - ${group.disabled ? 'Disabled' : 'Enabled'}\n`;
            }
            embed.addField(`Command Groups`, str, true);
            str = '';
            for (const command of commands) {
                str += `${command.name} - ${command.enabled ? 'Enabled' : 'Disabled'}\n`;
            }
            embed.addField('Commands', str, true);
            embed.setColor('RANDOM');
            return message.channel.send({ embeds: [embed] });
        }
        if (args[0] === 'disable') {
            const group = groups.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
            const command = commands.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
            if (group) {
                group.disabled = true;
                yield group.save();
                return message.channel.send(`Command group \`${group.name}\` has been disabled`);
            }
            else if (command) {
                command.enabled = false;
                yield command.save();
                return message.channel.send(`Command \`${command.name}\` has been disabled`);
            }
            else {
                return message.channel.send(`${args[1]} doesn't exist`);
            }
        }
        else if (args[0] === 'enable') {
            const group = groups.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
            const command = commands.find((x) => x.name.toLowerCase() === args[1].toLowerCase());
            if (group) {
                group.disabled = false;
                yield group.save();
                return message.channel.send(`Command group \`${group.name}\` has been enabled`);
            }
            else if (command) {
                command.enabled = true;
                yield command.save();
                return message.channel.send(`Command \`${command.name}\` has been enabled`);
            }
            else {
                return message.channel.send(`${args[1]} doesn't exist`);
            }
        }
    }),
});
