import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@/generated/prisma/client';
import { Request } from 'express';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: Prisma.CommentCreateInput) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  findAll(params: Request) {
    return this.prisma.comment.findMany({
      where: { dealId: +(params.query.cardId ?? 0) },
      include: { deal: { include: { customer: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  update(id: number, updateCommentDto: Prisma.CommentUpdateInput) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
