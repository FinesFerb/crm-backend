import { Injectable } from '@nestjs/common';
import { Deal, Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.DealCreateInput) {
    return this.prisma.deal.create({ data });
  }

  findAll(): Promise<Deal[]> {
    return this.prisma.deal.findMany({
      include: {
        customer: true,
      },
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
}
