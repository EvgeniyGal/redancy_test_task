import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: CredentialsDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    return await this.authService.signUp(signUpDto);
  }
}
