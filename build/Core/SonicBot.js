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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const instances_1 = require("./constants/instances");
const loaders_1 = require("./utils/loaders");
exports.default = new (class SonicBot {
    startBot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, loaders_1.loadFilesAsync)(['events', 'monitors', 'commands']);
            (0, mongoose_1.connect)(process.env.MONGO_CONNECTION_STRING);
            instances_1.client.login(process.env.DISCORD_BOT_TOKEN);
        });
    }
})();
