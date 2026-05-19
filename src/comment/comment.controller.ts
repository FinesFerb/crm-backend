import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { type CreateCommentDto } from './dto/create-comment.dto';
import { type UpdateCommentDto } from './dto/update-comment.dto';
import { type Request } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create({
      text: createCommentDto.text,
      deal: { connect: { id: +createCommentDto.idDeal } },
    });
  }

  @Get()
  findAll(@Req() params: Request) {
    return this.commentService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, {
      text: updateCommentDto.text,
      deal: { connect: { id: +updateCommentDto.idDeal } },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
