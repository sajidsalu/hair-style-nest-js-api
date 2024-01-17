import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  createdDate: { type: Date, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdDate: string;
  type: string;
  imageUrl: string;
}
