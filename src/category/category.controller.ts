import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  async addCategory(
    @Body('name') name: string,
    @Body('sortOrder') sortOrder: number,
  ) {
    const categoryId = await this.categoryService.insertCategory(
      name,
      sortOrder,
    );
    return {
      id: categoryId,
    };
  }

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }
}
