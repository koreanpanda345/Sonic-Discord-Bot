import { connect } from 'mongoose';
import { client } from './constants/instances';
import { loadFilesAsync } from './utils/loaders';

export default new (class SonicBot {
	public async startBot() {
		await loadFilesAsync(['events', 'monitors', 'commands']);
		connect(process.env.MONGO_CONNECTION_STRING as string);
		client.login(process.env.DISCORD_BOT_TOKEN);
	}
})();
