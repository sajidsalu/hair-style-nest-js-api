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
      console.error('Error validating user:', error);
      return null;
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<
    | { access_token: string; refresh_token: string; user_id: string }
    | { status: number; message: string }
  > {
    const UserNotFound = {
      status: 401,
      message: 'User not found',
    };
    try {
      const user = await this.validateUser(email, password);
      const payload = { username: email, id: user.id };
      if (user) {
        return {
          user_id: user?.id,
          access_token: this.jwtService.sign(payload),
          refresh_token: this.generateRefreshToken(), // Generate or fetch refresh token as needed
        };
      }
      return UserNotFound;
    } catch (e) {
      return UserNotFound;
    }
  }

  generateRefreshToken(): string {
    return uuidv4();
  }
}
