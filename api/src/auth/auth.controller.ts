import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

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
}
