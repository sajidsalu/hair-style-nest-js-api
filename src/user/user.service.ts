import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(user: User) {
    const newUser = new this.userModel({
      ...user,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdDate: user.createdDate,
      password: user.password,
      type: user.type,
      imageUrl: user.imageUrl,
    })) as User[];
  }

  async getUserById(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdDate: user.createdDate,
      password: user.password,
      type: user.type,
      imageUrl: user.imageUrl,
    };
  }
  private async findUser(userId: string) {
    let user;
    try {
      user = await this.userModel.findById(userId);
    } catch (error) {
      throw new NotFoundException('user not found');
    }
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
