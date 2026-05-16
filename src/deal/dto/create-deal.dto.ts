import { Status } from 'src/generated/prisma/enums';

export interface CreateDealDto {
  name: string;
  price: number;
  status: Status;
  customer: {
    email: string;
    name: string;
  };
}
