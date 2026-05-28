import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() body: LoginAuthDto) {

    return this.authService.login(
      body.username,
      body.password,
    );

  }

  @Post('register')
  register(@Body() body: CreateAuthDto) {

    return this.authService.register(body);

  }

}