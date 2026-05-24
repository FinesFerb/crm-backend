import { OmitType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './sign-up-user.dto';

export class SignInUserDto extends OmitType(SignUpUserDto, ['name'] as const) {}
