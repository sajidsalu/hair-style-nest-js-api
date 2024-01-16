import { Model } from 'mongoose';
import { Gender } from './gender.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class GenderService {
  constructor(
    @InjectModel('Gender') private readonly genderModel: Model<Gender>,
  ) {}

  async insertGender(name: string, sortOrder: number, imageUrl: string) {
    const newGender = new this.genderModel({
      name,
      sortOrder,
      imageUrl,
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
      imageUrl: gender.imageUrl,
    })) as Gender[];
  }

  async updateGenderById(
    genderId: string,
    name: string,
    sortOrder: number,
    imageUrl: string,
  ) {
    try {
      const updatedGender = await this.findGender(genderId);
      console.log('imageUrl', imageUrl);
      if (name) {
        updatedGender.name = name;
      }
      if (sortOrder) {
        updatedGender.sortOrder = sortOrder;
      }
      if (imageUrl) {
        updatedGender.imageUrl = imageUrl;
      }
      console.log('updatedGender', updatedGender);
      updatedGender.save();
    } catch (error: any) {
      throw new NotFoundException(error);
    }
  }

  private async findGender(genderId: string) {
    let gender;
    try {
      gender = await this.genderModel.findById(genderId);
    } catch (error) {
      throw new NotFoundException('item not found');
    }
    if (!gender) {
      throw new NotFoundException('item not found');
    }
    return gender;
  }
}
