import { Document, model, Schema } from 'mongoose';

export interface IRadioStationSchema extends Document {
	name: string;
	url: string;
}

const schema = new Schema({
	name: String,
	url: String,
});

export default model<IRadioStationSchema>('Radio Stations', schema);
