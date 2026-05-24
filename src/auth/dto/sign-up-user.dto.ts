import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
