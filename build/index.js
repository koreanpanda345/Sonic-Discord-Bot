"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const SonicBot_1 = __importDefault(require("./Core/SonicBot"));
(0, dotenv_1.config)();
SonicBot_1.default.startBot();
