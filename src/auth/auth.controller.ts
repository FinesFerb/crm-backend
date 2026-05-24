import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/public/public.decorator';
import type { Request, Response } from 'express';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { PayloadUserDto } from './dto/payload-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInUserDto,
  ) {
    const { access_token, userName } = await this.authService.signIn(signInDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return {
      email: signInDto.email,
      name: userName,
      status: access_token !== '',
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpUserDto,
  ) {
    const { access_token } = await this.authService.signUp(signUpDto);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return {
      email: signUpDto.email,
      name: signUpDto.name,
      status: access_token !== '',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('account')
  account(@Req() req: Request & { user: PayloadUserDto }) {
    return { email: req.user.email, name: req.user.name, status: !!req.user };
  }
}
