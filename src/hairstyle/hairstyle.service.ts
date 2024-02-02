import { Model } from 'mongoose';
import { HairStyle } from './hairstyle.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageDto } from '../common/page.dto';

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
  ): Promise<{
    results: HairStyle[];
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
  }> {
    const { page, limit } = pageOptionsDto;

    const query: any = {
      gender: gender,
    };
    if (category !== '65a573b096fcee2c149752c9') {
      query.category = category;
    }
    // Query MongoDB to get paginated hairstyles based on gender and category
    const hairstylesQuery = this.hairstyleModel.find(query);

    // Create a separate query for counting documents
    const countQuery = this.hairstyleModel.countDocuments(query);

    // Execute the count query
    const count = await countQuery;

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    //const hasNextPage = (page + 1) * limit < count;
    const hasNextPage = page < totalPages - 1;

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
      hasNextPage: hasNextPage, //TODO
    };
  }

  async updateHairStyleById(hairStyleId: string, categoryId: string) {
    try {
      const updatedHairStyle = await this.findHairStyle(hairStyleId);
      if (categoryId) {
        updatedHairStyle.category = categoryId;
      }
      updatedHairStyle.save();
    } catch (error: any) {
      throw new NotFoundException(error);
    }
  }
}
