"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    rarity: String,
    symbol: String,
    max: Number,
    min: Number,
});
exports.default = (0, mongoose_1.model)('Fishy', schema);
