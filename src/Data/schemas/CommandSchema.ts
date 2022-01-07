import { Document, model, Schema } from 'mongoose';

export interface ICommandSchema extends Document {
	name: string;
	aliases: string[];
	description: string;
	usages: string[];
	group: string;
	enabled: boolean;
}

const schema = new Schema({
	name: String,
	aliases: [String],
	description: String,
	usages: [String],
	group: String,
	enabled: Boolean,
});

export default model<ICommandSchema>('Commands', schema);
