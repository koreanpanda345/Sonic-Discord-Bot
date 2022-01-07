import { Document, model, Schema } from 'mongoose';

export interface IFishySchema extends Document {
	name: string;
	rarity: string;
	symbol: string;
	max: number;
	min: number;
}

const schema = new Schema({
	name: String,
	rarity: String,
	symbol: String,
	max: Number,
	min: Number,
});

export default model<IFishySchema>('Fishy', schema);
