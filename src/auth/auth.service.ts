import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    data: SignInUserDto,
  ): Promise<{ access_token: string; userName: string }> {
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userName: user.name,
    };
  }

  async signUp(data: SignUpUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne({ email: data.email });
    if (user?.email === data.email) {
      throw new BadRequestException();
    }
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    const { email, name } = await this.userService.create(data);
    const payload = { email: email, name: name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
