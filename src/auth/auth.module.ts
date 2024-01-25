// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/user.model';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'hairstyle',
      signOptions: { expiresIn: '365d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserService],
  exports: [JwtModule],
})
export class AuthModule {}
