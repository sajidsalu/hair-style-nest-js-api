import { Model } from 'mongoose';
import { Gender } from './gender.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class GenderService {
  constructor(
    @InjectModel('Gender') private readonly genderModel: Model<Gender>,
  ) {}

  async insertGender(name: string, sortOrder: number) {
    const newGender = new this.genderModel({
      name,
      sortOrder,
    });
    const result = await newGender.save();
    return result.id as string;
  }

  async getAllGenders() {
    const genders = await this.genderModel.find().exec();
    return genders.map((gender) => ({
      id: gender.id,
      name: gender.name,
      sortOrder: gender.sortOrder,
    })) as Gender[];
  }
}
