import { Document, model, Schema } from 'mongoose';

export interface ICommandGroupSchema extends Document {
	name: string;
	description: string;
	emoji: string;
	disabled: boolean;
}

const schema = new Schema({
	name: String,
	description: String,
	emoji: String,
	disabled: Boolean,
});

export default model<ICommandGroupSchema>('Commands Groups', schema);
