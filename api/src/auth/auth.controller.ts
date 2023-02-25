import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() user: SignUpDto): Promise<User> {
    return this.authService.signupLocal(user);
  }
}
