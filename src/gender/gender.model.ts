import * as mongoose from 'mongoose';

export const genderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  imageUrl: { type: String, required: false },
});

export interface Gender extends mongoose.Document {
  id: string;
  name: string;
  sortOrder: number;
  imageUrl: string;
}
