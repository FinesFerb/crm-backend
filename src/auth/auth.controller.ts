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
import { Prisma } from '@/generated/prisma/client';
import { Public } from '@/public/public.decorator';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: Record<string, string>,
  ) {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return {
      email: signInDto.email,
      name: signInDto.name,
      status: access_token !== '',
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: Prisma.UserCreateInput,
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

  @Get('account')
  account(@Req() req: Request & { user?: { email: string; name: string } }) {
    return { email: req.user?.email, name: req.user?.name, status: !!req.user };
  }
}
