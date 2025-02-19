import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  save(@Body() post: PostEntity): Promise<PostEntity> {
    console.log(post)
    return this.postsService.save(post);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.postsService.remove(id);
  }

  @Patch(':id')
  updateDescription(@Param('id') id: number, @Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.updateDescription(id, post);
  }
}
