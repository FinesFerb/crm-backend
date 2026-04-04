import { Deal } from 'src/deal/entities/deal.entity';

export class CreateCustomerDto {
  email: string;
  name: string;
  avatar: string | undefined;
  from_source: string | undefined | null;
  deals: Deal[] | undefined;
}
