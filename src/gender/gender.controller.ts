import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('genders')
export class GenderController {
  constructor(private genderService: GenderService) {}

  @Post()
  async addGender(
    @Body('name') name: string,
    @Body('sortOrder') sortOrder: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    const genderId = await this.genderService.insertGender(
      name,
      sortOrder,
      imageUrl,
    );
    return {
      id: genderId,
    };
  }

  @Get()
  async getAllGenders() {
    return await this.genderService.getAllGenders();
  }

  @Patch(':id')
  async updateGender(
    @Param('id') genderId: string,
    @Body('name') name?: string,
    @Body('sortOrder') sortOrder?: number,
    @Body('imageUrl') imageUrl?: string,
  ) {
    await this.genderService.updateGenderById(
      genderId,
      name,
      sortOrder,
      imageUrl,
    );
  }
}
