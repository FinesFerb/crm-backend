import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Deal } from './entities/deal.entity';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.DealCreateInput) {
    return this.prisma.deal.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DealWhereUniqueInput;
    where?: Prisma.DealWhereInput;
    orderBy?: Prisma.DealOrderByWithRelationInput;
  }): Promise<Deal[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.deal.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: Prisma.DealWhereUniqueInput): Promise<Deal | null> {
    return this.prisma.deal.findUnique({
      where,
    });
  }

  update(params: {
    where: Prisma.DealWhereUniqueInput;
    data: Prisma.DealUpdateInput;
  }): Promise<Deal> {
    const { where, data } = params;
    return this.prisma.deal.update({
      where,
      data,
    });
  }

  remove(where: Prisma.DealWhereUniqueInput): Promise<Deal> {
    return this.prisma.deal.delete({
      where,
    });
  }
}
