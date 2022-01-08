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
const UserDataSchema_1 = __importDefault(require("../../../Data/schemas/UserDataSchema"));
const instances_1 = require("../../constants/instances");
const helpers_1 = require("../../utils/helpers");
(0, helpers_1.createBotEvent)({
    name: 'messageCreate',
    invoke: (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.bot)
            return;
        let user = yield UserDataSchema_1.default.findOne({ user_id: message.author.id });
        if (!user) {
            user = yield UserDataSchema_1.default.create({
                user_id: message.author.id,
                balloon_pop: 0,
                bubble_pop: 0,
            });
            yield user.save();
        }
        if (typeof user.bubble_pop === 'undefined')
            user.bubble_pop = 0;
        if (typeof user.fishy === 'undefined')
            user.fishy = 0;
        if (typeof user.balance === 'undefined')
            user.balance = 0;
        yield user.save();
        const commandHandler = instances_1.cache.monitors.get('command_handler');
        yield (commandHandler === null || commandHandler === void 0 ? void 0 : commandHandler.invoke(message));
    }),
});
