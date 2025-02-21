import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
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
  save(@Body() post: PostEntity, @Request() req): Promise<PostEntity> {
    return this.postsService.save(post, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req): Promise<HttpStatus> {
    return this.postsService.remove(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDescription(@Param('id') id: number, @Request() req, @Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.updateDescription(id, post, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('like/:id')
  like(@Param('id') id: number, @Request() req): Promise<PostEntity> {
    return this.postsService.like(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('dislike/:id')
  dislike(@Param('id') id: number, @Request() req): Promise<PostEntity> {
    return this.postsService.dislike(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('viewed/:id')
  viewed(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.viewed(id);
  }
}
