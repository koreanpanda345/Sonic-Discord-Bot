"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    aliases: [String],
    description: String,
    usages: [String],
    group: String,
    enabled: Boolean,
});
exports.default = (0, mongoose_1.model)('Commands', schema);
