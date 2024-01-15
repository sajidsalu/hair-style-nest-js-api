import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.model';
import { Model } from 'mongoose';

export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(name: string, sortOrder: number) {
    const newCategory = new this.categoryModel({
      name,
      sortOrder,
    });
    const result = await newCategory.save();
    return result.id as string;
  }

  async getAllCategories() {
    const categories = await this.categoryModel.find().exec();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      sortOrder: category.sortOrder,
    })) as Category[];
  }
}
