import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GenderModule } from './gender/gender.module';
import { CategoryModule } from './category/category.module';
import { HairstyleModule } from './hairstyle/hairstyle.module';
import { UserModule } from './user/user.module';
import { CorsMiddleware } from './common/cors.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GenderModule,
    CategoryModule,
    HairstyleModule,
    MongooseModule.forRoot(
      'mongodb+srv://sajid-m:Podapulle%401234@cluster0.hokatox.mongodb.net/hair-styles-?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
