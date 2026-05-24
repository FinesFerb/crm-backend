import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Customer, Prisma } from '@/generated/prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  findOne(where: Prisma.CustomerWhereUniqueInput): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where,
    });
  }

  update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this.prisma.customer.update({
      where,
      data,
    });
  }
}
