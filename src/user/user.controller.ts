import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Body('userDTO') userDto: User) {
    const response = await this.userService.insertUser(userDto);
    console.log('response is', response);
    return response;
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }
}
