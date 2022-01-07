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
exports.createBotCommand = exports.createBotMonitor = exports.createBotEvent = void 0;
const CommandSchema_1 = __importDefault(require("../../Data/schemas/CommandSchema"));
const instances_1 = require("../constants/instances");
function createBotEvent(event) {
    if (instances_1.cache.events.has(event.name))
        return;
    if (event.disabled)
        return;
    if (event.once)
        instances_1.client.once(event.name, (...args) => __awaiter(this, void 0, void 0, function* () { return yield event.invoke(...args); }));
    else
        instances_1.client.on(event.name, (...args) => __awaiter(this, void 0, void 0, function* () { return yield event.invoke(...args); }));
    instances_1.cache.events.set(event.name, event);
    console.log(`Registered Event ${event.name}`);
}
exports.createBotEvent = createBotEvent;
function createBotMonitor(monitor) {
    if (instances_1.cache.monitors.has(monitor.name))
        return;
    instances_1.cache.monitors.set(monitor.name, monitor);
    console.log(`Registered Monitor ${monitor.name}`);
}
exports.createBotMonitor = createBotMonitor;
function createBotCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        if (instances_1.cache.commands.has(command.name))
            return;
        const cmd = yield CommandSchema_1.default.findOne({ name: command.name });
        if (!cmd) {
            yield CommandSchema_1.default.create({
                name: command.name,
                aliases: command.aliases || [],
                group: command.group || 'core',
                description: command.description || 'No description',
                usages: command.usages || [],
                enabled: !command.disabled || true,
            });
        }
        instances_1.cache.commands.set(command.name, command);
        console.log(`Register Command ${command.name}`);
    });
}
exports.createBotCommand = createBotCommand;
