import { config } from 'dotenv';
import { audioManager, cache } from './Core/constants/instances';
import SonicBot from './Core/SonicBot';
config();

SonicBot.startBot();
