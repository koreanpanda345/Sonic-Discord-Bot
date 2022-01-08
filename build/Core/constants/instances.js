"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioManager = exports.cache = exports.client = void 0;
const discord_js_1 = require("discord.js");
const discordaudio_1 = require("discordaudio");
exports.client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES],
});
exports.cache = {
    commands: new discord_js_1.Collection(),
    events: new discord_js_1.Collection(),
    monitors: new discord_js_1.Collection(),
    connections: new discord_js_1.Collection(),
};
exports.audioManager = new discordaudio_1.AudioManager();
