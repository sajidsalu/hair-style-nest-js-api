import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hairStyleSchema } from './hairstyle.model';
import { HairStyleController } from './hairstyle.controller';
import { HairStyleService } from './hairstyle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hairstyle', schema: hairStyleSchema }]),
  ],
  controllers: [HairStyleController],
  providers: [HairStyleService],
})
export class HairstyleModule {}
