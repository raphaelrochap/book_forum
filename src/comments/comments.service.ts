
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(CommentEntity)
      private commentsRepository: Repository<CommentEntity>
  ) {}

  findAll(): Promise<CommentEntity[]> {
    return this.commentsRepository.find({
      relations: ["user_id", "post_id"]
    });
  }

  findOne(id: number): Promise<CommentEntity> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ["user_id", "post_id"]
    });
  }

  save(comment: CommentEntity): Promise<CommentEntity> {
    return this.commentsRepository.save(comment);
  }

  remove(id: number) {
    return this.commentsRepository.delete(id);
  }

  updateDescription(id: number, comment: CommentEntity): Promise<CommentEntity> {
    this.commentsRepository.update(id, comment);
    return this.findOne(id)
  }
}