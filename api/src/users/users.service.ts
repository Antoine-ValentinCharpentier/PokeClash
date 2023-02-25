import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      username,
      email,
      password,
    });

    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });

    return user;
  }
}
