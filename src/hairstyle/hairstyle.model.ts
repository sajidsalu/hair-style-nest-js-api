import * as mongoose from 'mongoose';

export const hairStyleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  createdDate: { type: Date, required: true },
  gender: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export interface HairStyle extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  gender: string;
  category: string;
  imageUrl: string;
}
