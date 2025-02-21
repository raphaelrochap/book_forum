import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PostEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, PostsService],
})

export class CommentsModule {}