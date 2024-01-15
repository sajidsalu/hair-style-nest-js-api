import { Model } from 'mongoose';
import { HairStyle } from './hairstyle.model';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

export class HairStyleService {
  constructor(
    @InjectModel('Hairstyle') private readonly hairstyleModel: Model<HairStyle>,
  ) {}

  async insertHairStyle(
    name: string,
    description: string,
    createdDate: string,
    gender: string,
    category: string,
    imageUrl: string,
  ) {
    const newHairStyle = new this.hairstyleModel({
      name,
      description,
      createdDate,
      gender,
      category,
      imageUrl,
    });
    const result = await newHairStyle.save();
    return result.id as string;
  }

  async getAllHairStyles() {
    const hairStyes = await this.hairstyleModel.find().exec();
    return hairStyes.map((hairstyle) => ({
      id: hairstyle.id,
      name: hairstyle.name,
      description: hairstyle.description,
      createdDate: hairstyle.createdDate,
      gender: hairstyle.gender,
      category: hairstyle.category,
      imageUrl: hairstyle.imageUrl,
    })) as HairStyle[];
  }

  async getHairStyleById(hairStyleId: string) {
    const hairstyle = await this.findHairStyle(hairStyleId);
    return {
      id: hairstyle.id,
      name: hairstyle.name,
      description: hairstyle.description,
      createdDate: hairstyle.createdDate,
      gender: hairstyle.gender,
      category: hairstyle.category,
      imageUrl: hairstyle.imageUrl,
    };
  }

  private async findHairStyle(hairstyleId: string) {
    let hairstyle;
    try {
      hairstyle = await this.hairstyleModel.findById(hairstyleId);
    } catch (error) {
      throw new NotFoundException('item not found');
    }
    if (!hairstyle) {
      throw new NotFoundException('item not found');
    }
    return hairstyle;
  }
}
