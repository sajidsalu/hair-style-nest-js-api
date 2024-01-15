import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('genders')
export class GenderController {
  constructor(private genderService: GenderService) {}

  @Post()
  async addGender(
    @Body('name') name: string,
    @Body('sortOrder') sortOrder: number,
  ) {
    const genderId = await this.genderService.insertGender(name, sortOrder);
    return {
      id: genderId,
    };
  }

  @Get()
  async getAllGenders() {
    return await this.genderService.getAllGenders();
  }
}
