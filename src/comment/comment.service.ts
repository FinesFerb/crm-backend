import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Comment, Prisma } from '@/generated/prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  findAll(cardId: number) {
    return this.prisma.comment.findMany({
      where: { dealId: cardId },
      include: { deal: { include: { customer: true } } },
    });
  }
}
