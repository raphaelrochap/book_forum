
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      relations: ["user_id", "post_id", "post_id.user_id"]
    });
  }

  findOne(id: number): Promise<CommentEntity> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ["user_id", "post_id", "post_id.user_id"]
    });
  }

  save(comment: CommentEntity): Promise<CommentEntity> {
    return this.commentsRepository.save(comment);
  }

  async remove(id: number, user_id: number) {
    const current_comment = await this.findOne(id)
    
    if((current_comment?.user_id?.id == user_id) || (current_comment?.post_id.user_id?.id == user_id))
      return this.commentsRepository.delete(id);
    else
      throw new HttpException('Você não tem permissão ou este Comentário não existe', HttpStatus.NOT_FOUND);
  }

  async updateDescription(id: number, comment: CommentEntity, user_id: number): Promise<CommentEntity> {
    const current_comment = await this.findOne(id)
    
    if(current_comment?.user_id?.id == user_id)
    {
      this.commentsRepository.update(id, comment);
      return this.findOne(id)
    }
    else
      throw new HttpException('Você não tem permissão ou este Comentário não existe', HttpStatus.NOT_FOUND);
  }
}