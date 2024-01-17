import { Model } from 'mongoose';
import { HairStyle } from './hairstyle.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageDto } from 'src/common/page.dto';

@Injectable()
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
  async getAllHairStylesByGender(gender: string, pageOptionsDto: PageDto) {
    const { page, limit } = pageOptionsDto;
    const hairstylesQuery = this.hairstyleModel.find({ gender: gender });
    const countQuery = this.hairstyleModel.countDocuments({ gender: gender });
    const totalCount = await countQuery;
    const totalPages = Math.ceil(totalCount / limit);
    const hairstyles = await hairstylesQuery
      .skip(page * limit)
      .limit(limit)
      .exec();

    const results = hairstyles.map((hairstyle) => ({
      id: hairstyle.id,
      name: hairstyle.name,
      description: hairstyle.description,
      createdDate: hairstyle.createdDate,
      gender: hairstyle.gender,
      category: hairstyle.category,
      imageUrl: hairstyle.imageUrl,
    })) as HairStyle[];

    return {
      results,
      totalCount,
      totalPages,
    };
  }

  async getAllHairStylesByCategory(category: string, pageOptionsDto: PageDto) {
    const { page, limit } = pageOptionsDto;
    const hairstylesQuery = this.hairstyleModel.find({ category: category });
    const countQuery = this.hairstyleModel.countDocuments({
      category: category,
    });
    const totalCount = await countQuery;
    const totalPages = Math.ceil(totalCount / limit);
    const hairstyles = await hairstylesQuery
      .skip(page * limit)
      .limit(limit)
      .exec();

    const results = hairstyles.map((hairstyle) => ({
      id: hairstyle.id,
      name: hairstyle.name,
      description: hairstyle.description,
      createdDate: hairstyle.createdDate,
      gender: hairstyle.gender,
      category: hairstyle.category,
      imageUrl: hairstyle.imageUrl,
    })) as HairStyle[];

    return {
      results,
      totalCount,
      totalPages,
    };
  }

  async getAllHairStylesByGenderAndCategory(
    gender: string,
    category: string,
    pageOptionsDto: PageDto,
  ): Promise<{ results: HairStyle[]; totalCount: number; totalPages: number }> {
    const { page, limit } = pageOptionsDto;

    // Query MongoDB to get paginated hairstyles based on gender and category
    const hairstylesQuery = this.hairstyleModel.find({
      gender: gender,
      category: category,
    });

    // Create a separate query for counting documents
    const countQuery = this.hairstyleModel.countDocuments({
      gender: gender,
      category: category,
    });

    // Execute the count query
    const count = await countQuery;

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // Apply pagination and retrieve hairstyles
    const hairstyles = await hairstylesQuery
      .skip(page * limit)
      .limit(limit)
      .exec();

    // Transform the results and include count and totalPages
    const transformedHairstyles = hairstyles.map((hairstyle) => ({
      id: hairstyle.id,
      name: hairstyle.name,
      description: hairstyle.description,
      createdDate: hairstyle.createdDate,
      gender: hairstyle.gender,
      category: hairstyle.category,
      imageUrl: hairstyle.imageUrl,
    })) as HairStyle[];

    return {
      results: transformedHairstyles,
      totalCount: count,
      totalPages: totalPages,
    };
  }
}
