import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { Public } from 'src/auth/SkipAuth';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDTO) {
    return this.authService.signIn(signInDto);
  }
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDTO) {
    return this.authService.signUp(signUpDto);
  }
}
