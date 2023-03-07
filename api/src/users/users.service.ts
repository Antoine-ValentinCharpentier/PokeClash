import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hash = await this.hash(password);

    const newUser = new this.userModel({
      username,
      email,
      password: hash,
    });

    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken,
    });
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}
