import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sortOrder: { type: Number, required: true },
});
export interface Category extends mongoose.Document {
  id: string;
  name: string;
  sortOrder: number;
}
