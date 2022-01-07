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
const instances_1 = require("../../constants/instances");
const helpers_1 = require("../../utils/helpers");
function parsePrefix(guildId) {
    const prefix = process.env.DISCORD_BOT_PREFIX;
    return prefix || process.env.DISCORD_BOT_PREFIX;
}
function parseCommand(name) {
    return instances_1.cache.commands.get(name) || instances_1.cache.commands.find((c) => c.aliases && c.aliases.includes(name));
}
function validatePermissions(command, message) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (command.permissions) {
        if (command.permissions.self) {
            if (command.permissions.self.server)
                if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has(command.permissions.self.server)))
                    return false;
            if ((_c = command.permissions.self) === null || _c === void 0 ? void 0 : _c.channel)
                if (!((_e = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.me) === null || _e === void 0 ? void 0 : _e.permissionsIn(message.channelId).has(command.permissions.self.channel)))
                    return false;
        }
        if (command.permissions.user) {
            if (command.permissions.user.server)
                if (!((_f = message.member) === null || _f === void 0 ? void 0 : _f.permissions.has(command.permissions.user.server)))
                    return false;
            if (command.permissions.user.channel)
                if (!((_g = message.member) === null || _g === void 0 ? void 0 : _g.permissionsIn(message.channelId).has(command.permissions.user.channel)))
                    return false;
        }
    }
    return true;
}
(0, helpers_1.createBotMonitor)({
    name: 'command_handler',
    invoke: (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const prefix = parsePrefix(message.guildId);
        if (!message.content
            .toLowerCase()
            .trim()
            .startsWith(prefix))
            return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const command = parseCommand(commandName);
        // Since undefined and null are both falsy, it will return false, if the command doesn't exist.
        if (!command)
            return;
        const validated = validatePermissions(command, message);
        if (!validatePermissions) {
            return message.reply('You are missing permissions to perform this action. Use the help command to find what permissions this command requires.');
        }
        try {
            yield command.invoke(message, args);
        }
        catch (error) {
            console.error(error);
        }
    }),
});
