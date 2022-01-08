"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    description: String,
    emoji: String,
    disabled: Boolean,
});
exports.default = (0, mongoose_1.model)('Commands Groups', schema);
