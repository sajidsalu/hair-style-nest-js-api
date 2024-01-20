// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    console.log('Received login request:', email, password);
    return this.authService.login(email, password);
  }

  //   @Post('signup')
  //   async signUp(@Request() req): Promise<User> {
  //     return this.authService.signUp(req.body);
  //   }
}
