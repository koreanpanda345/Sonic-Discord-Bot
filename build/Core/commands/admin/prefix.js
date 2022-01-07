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
const GuildSettingsSchema_1 = __importDefault(require("../../../Data/schemas/GuildSettingsSchema"));
const helpers_1 = require("../../utils/helpers");
//TODO: Finish making this command.
(0, helpers_1.createBotCommand)({
    name: 'prefix',
    description: '',
    invoke: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let settings = yield GuildSettingsSchema_1.default.findOne({ guild_id: message.guildId }).exec();
        if (!settings) {
            settings = yield GuildSettingsSchema_1.default.create({
                guild_id: message.guildId,
                prefix: process.env.DISCORD_BOT_PREFIX,
            });
            yield settings.save();
        }
        if (args[0] === 'set') {
            if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('MANAGE_GUILD')))
                return message.reply('You do not have permission to do this.').then((m) => {
                    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield m.delete();
                    }), 10000);
                });
        }
    }),
});
