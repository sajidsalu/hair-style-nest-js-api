// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmailAndPassword(
        email,
        password,
      );
      return user;
    } catch (error) {
      // Handle the error, log it, or return null
      console.error('Error validating user:', error);
      return null;
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.validateUser(email, password);
    const payload = { username: email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(), // Generate or fetch refresh token as needed
    };
  }

  generateRefreshToken(): string {
    return uuidv4();
  }
}
