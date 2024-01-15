import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { genderSchema } from './gender.model';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gender', schema: genderSchema }]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
