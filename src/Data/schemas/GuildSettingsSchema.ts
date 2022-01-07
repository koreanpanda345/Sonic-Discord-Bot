import { Document, model, Schema } from 'mongoose';

export interface IGuildSettingsSchema extends Document {
	guild_id: string;
	prefix: string;
	welcome: {
		enable: boolean;
		channel_id: string;
	};
}

const schema = new Schema({
	guild_id: String,
	prefix: String,
	welcome: {
		enable: Boolean,
		channel_id: String,
	},
});

export default model<IGuildSettingsSchema>('Guild Settings', schema);
