"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user_id: String,
    balloon_pop: Number,
    bubble_pop: Number,
    fishy: Number,
    balance: Number,
});
exports.default = (0, mongoose_1.model)('Users', schema);
