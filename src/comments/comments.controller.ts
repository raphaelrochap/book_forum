import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentEntity } from './entities/comment.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  save(@Body() comment: CommentEntity): Promise<CommentEntity> {
    return this.commentsService.save(comment);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDescription(@Param('id') id: number, @Body() comment: CommentEntity) {
    return this.commentsService.updateDescription(id, comment);    
  }
}