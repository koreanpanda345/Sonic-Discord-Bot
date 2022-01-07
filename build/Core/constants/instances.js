"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.client = void 0;
const discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
exports.cache = {
    commands: new discord_js_1.Collection(),
    events: new discord_js_1.Collection(),
    monitors: new discord_js_1.Collection(),
};
