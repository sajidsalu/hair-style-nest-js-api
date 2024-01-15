import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HairStyleService } from './hairstyle.service';

@Controller('hairstyles')
export class HairStyleController {
  constructor(private hairstyleService: HairStyleService) {}

  @Post()
  async addHairStyle(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('createdDate') createdDate: string,
    @Body('gender') gender: string,
    @Body('category') category: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    const hairStyleId = await this.hairstyleService.insertHairStyle(
      name,
      description,
      createdDate,
      gender,
      category,
      imageUrl,
    );
    return { id: hairStyleId };
  }

  @Get()
  async getAllHairStyles() {
    return await this.hairstyleService.getAllHairStyles();
  }

  @Get(':id')
  async getHairStyleById(@Param('id') hairStyleId: string) {
    return await this.hairstyleService.getHairStyleById(hairStyleId);
  }
}
