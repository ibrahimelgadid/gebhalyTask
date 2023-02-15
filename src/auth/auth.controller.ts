import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() userData: RegisterDto) {
    return this.authService.createUser(userData);
  }

  @Post('/login')
  login(@Body() userData: LoginDto): Promise<{ access_token: string }> {
    return this.authService.loginUser(userData);
  }
}
