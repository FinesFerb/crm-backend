import { Status } from '@/generated/prisma/enums';

export interface CreateDealDto {
  name: string;
  price: number;
  status: Status;
  customer: {
    email: string;
    name: string;
  };
}
