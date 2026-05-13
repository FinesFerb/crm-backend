import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'src/generated/prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, name: user.name };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    data: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({ email: data.email });
    if (user?.email === data.email) {
      throw new BadRequestException();
    }

    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const { email, name } = await this.userService.create(data);
    const payload = { email: email, name: name };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
