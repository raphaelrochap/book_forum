
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
      @InjectRepository(PostEntity)
      private postsRepository: Repository<PostEntity>
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find({
      relations: ["user_id"]
    });
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ["user_id"]
    });
  }

  save(post: PostEntity): Promise<PostEntity> {
    return this.postsRepository.save(post);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.postsRepository.delete(id);
  }

  updateDescription(id: number, post: PostEntity): Promise<PostEntity> {
    this.postsRepository.update(id, post);
    return this.findOne(id)
  }
}
