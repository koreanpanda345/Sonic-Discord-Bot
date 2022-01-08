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
const instances_1 = require("../../constants/instances");
const variables_1 = require("../../constants/variables");
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotCommand)({
    name: 'help',
    aliases: ['command', 'commands'],
    description: '',
    group: 'bot',
    usages: ['*help'],
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const bicon = (_a = instances_1.client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL();
        const options = args.join(' ').slice(0);
        const embed = new discord_js_1.MessageEmbed();
        const commands = yield CommandSchema_1.default.find({}).exec();
        embed.setAuthor({
            name: (_b = instances_1.client.user) === null || _b === void 0 ? void 0 : _b.username,
        });
        embed.setThumbnail(bicon);
        embed.setColor('RANDOM');
        embed.setTimestamp();
        embed.setFooter({
            text: `Requested by ${message.author.tag}`,
        });
        const prefix = '*';
        const groups = yield CommandGroupSchema_1.default.find({}).exec();
        const groupNames = groups.map((x) => x.name);
        const actions = groups.map((x) => x.name.toLowerCase());
        if (!options) {
            // Show the command groups
            embed.setTitle('My Commands');
            embed.setDescription('If a command group is crossed out, then it means that it is disabled.');
            for (const group of groups) {
                embed.addField(`${group.disabled ? '~~' : ''}${prefix}help ${group.name.toLowerCase()}${group.disabled ? '~~' : ''} | ${group.emoji}`, `${group.disabled ? '~~' : ''}${group.description || 'No description'}${group.disabled ? '~~' : ''}`);
            }
        }
        else if (actions.includes(options.toLowerCase())) {
            const group = groups.find((x) => x.name.toLowerCase() === options.toLowerCase());
            embed.setTitle(`**${group.emoji} ${group.name} Commands ${group.emoji}**`);
            const filter = commands.filter((x) => x.group.toLowerCase() === group.name.toLowerCase());
            if (filter.length === 0) {
                embed.setDescription("🦗 *cricket noises*\n There doesn't seem to be anything here. 🦗");
            }
            for (const command of filter) {
                embed.addField(`${prefix}${command.name}`, `${command.description}${command.usages.length > 0 ? ` (Usage) ${command.usages.join(', ')}` : ''}`);
            }
        }
        else {
            embed.setTitle('Oh this is awkward....');
            embed.setDescription(`There doesn't seem to be a command group called ${options}. Maybe you misspelt it, or something.\n` +
                `But since you are here, watch me beat this game.`);
            embed.setImage(variables_1.error_404_image);
        }
        message.channel.send({ embeds: [embed] });
    }),
});
