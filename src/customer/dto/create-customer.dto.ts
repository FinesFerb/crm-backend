import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  name!: string;

  @IsString()
  avatar?: string;

  @IsString()
  fromSource?: string;
}
