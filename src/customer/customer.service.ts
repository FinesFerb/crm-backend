import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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

  remove(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
