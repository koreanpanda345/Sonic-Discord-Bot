import { Document, model, Schema } from 'mongoose';

export interface IUserDataSchema extends Document {
	user_id: string;
	balloon_pop: number;
	bubble_pop: number;
	fishy: number;
	balance: number;
}

const schema = new Schema({
	user_id: String,
	balloon_pop: Number,
	bubble_pop: Number,
	fishy: Number,
	balance: Number,
});

export default model<IUserDataSchema>('Users', schema);
