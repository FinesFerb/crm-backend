import { OmitType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './sign-up-user.dto';

export class PayloadUserDto extends OmitType(SignUpUserDto, [
  'password',
] as const) {}
