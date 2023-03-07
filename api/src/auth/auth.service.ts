import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';

import { SignInDto, SignUpDto } from './dto';
import { Tokens, AccessTokenPayload, SignInInfos } from './types';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async signupLocal(user: SignUpDto): Promise<User> {
    const { email, username, password } = user;

    const userFound = await this.usersService.findUserByEmail(email);
    if (userFound) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    return this.usersService.create(username, email, password);
  }

  async signinLocal(user: SignInDto): Promise<SignInInfos> {
    const { email, password } = user;

    const userFound = await this.usersService.findUserByEmail(email);
    if (!userFound) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }

    const matchPassword = await this.validatePassword(
      password,
      userFound.password,
    );
    if (!matchPassword) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = this.generateTokens(userFound._id, email);

    await this.usersService.updateRefreshToken(
      userFound._id,
      tokens.refreshToken,
    );

    const userInfo = {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    };

    return {
      tokens,
      user: userInfo,
    };
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateTokens(userId: string, email: string): Tokens {
    const jwtPayload: AccessTokenPayload = {
      userId,
      email,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
