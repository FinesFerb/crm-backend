import { CreateCustomerDto } from '@/customer/dto/create-customer.dto';
import { Status } from '@/generated/prisma/enums';
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

export class CreateDealDto {
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  price!: number;

  @IsEnum(Status)
  status!: Status;

  @IsNotEmptyObject()
  customer!: CreateCustomerDto;
}
