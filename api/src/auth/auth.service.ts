import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async signupLocal(user: SignUpDto): Promise<User> {
    const hash = await this.hash(user.password);
    const { email, username } = user;

    const userFound = await this.usersService.findUserByEmail(email);
    if (userFound) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    return this.usersService.create(username, email, hash);
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
