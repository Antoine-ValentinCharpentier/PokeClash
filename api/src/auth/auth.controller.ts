import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { SignInInfos } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() user: SignUpDto,
  ): Promise<{ username: string; email: string }> {
    const { username, email } = await this.authService.signupLocal(user);
    return { username, email };
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<SignInInfos> {
    return this.authService.signinLocal(dto);
  }
}
