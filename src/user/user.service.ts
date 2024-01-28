import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(user: User) {
    try {
      const newUser = new this.userModel({
        ...user,
      });
      const existingUser = await this.findUserByEmailId(newUser.email);
      if (newUser.type === 'by email') {
        if (existingUser) {
          return {
            statusCode: 409,
            message: 'Email already exists',
          };
        } else {
          await newUser.save();
          return {
            statusCode: 200,
            message: 'user has been created successfully',
          };
        }
      } else if (newUser.type === 'by google') {
        if (existingUser) {
          return {
            statusCode: 200,
            message: 'user has been created successfully',
          };
        } else {
          await newUser.save();
          return {
            statusCode: 200,
            message: 'user has been created successfully',
          };
        }
      }
    } catch (e) {
      return {
        statusCode: 500,
        message: 'failed to create user',
      };
    }
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

  async getUserByEmailAndPassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email, password }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

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
  private async findUserByEmailId(email: string) {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
