import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, User } from '@/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
