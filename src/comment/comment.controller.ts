import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create({
      text: createCommentDto.text,
      deal: { connect: { id: createCommentDto.idDeal } },
    });
  }

  @Get()
  findAll(@Query('cardId', ParseIntPipe) id: number) {
    return this.commentService.findAll(id);
  }
}
