import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  save(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.save(post);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.postsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDescription(@Param('id') id: number, @Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.updateDescription(id, post);
  }
}
