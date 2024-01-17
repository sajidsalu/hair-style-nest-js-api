import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HairStyleService } from './hairstyle.service';
import { PageDto } from '../common/page.dto';
import { HairStyle } from './hairstyle.model';

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

  @Get('gender/:gender')
  async getAllHairstylesByGender(
    @Param('gender') gender: string,
    @Query() PageOptionsDto: PageDto,
  ): Promise<{ results: HairStyle[]; totalCount: number; totalPages: number }> {
    return this.hairstyleService.getAllHairStylesByGender(
      gender,
      PageOptionsDto,
    );
  }

  @Get('category/:category')
  async getAllHairstylesByCategory(
    @Param('category') category: string,
    @Query() PageOptionsDto: PageDto,
  ): Promise<{ results: HairStyle[]; totalCount: number; totalPages: number }> {
    return this.hairstyleService.getAllHairStylesByGender(
      category,
      PageOptionsDto,
    );
  }

  @Get('gender/:gender/category/:category')
  async getAllHairstylesByGenderAndCategory(
    @Param('gender') gender: string,
    @Param('category') category: string,
    @Query() pageOptionsDto: PageDto,
  ): Promise<{ results: HairStyle[]; totalCount: number; totalPages: number }> {
    return this.hairstyleService.getAllHairStylesByGenderAndCategory(
      gender,
      category,
      pageOptionsDto,
    );
  }
}
