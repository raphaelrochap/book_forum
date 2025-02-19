import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentsService.findOne(id);
  }

  @Post()
  save(@Body() comment: CommentEntity): Promise<CommentEntity> {
    console.log(comment)
    return this.commentsService.save(comment);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }

  @Patch(':id')
  updateDescription(@Param('id') id: number, @Body() comment: CommentEntity) {
    return this.commentsService.updateDescription(id, comment);    
  }
}