"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    guild_id: String,
    prefix: String,
    welcome: {
        enable: Boolean,
        channel_id: String,
    },
});
exports.default = (0, mongoose_1.model)('Guild Settings', schema);
