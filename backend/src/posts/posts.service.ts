
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

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

  async findOne(id: number): Promise<PostEntity> {
    return await this.postsRepository.findOne({
      where: { id },
      relations: ["user_id"]
    });
  }

  save(post: PostEntity): Promise<PostEntity> {
    return this.postsRepository.save(post);
  }

  async remove(id: number, user_id: number): Promise<HttpStatus> {
    const post:PostEntity = await this.findOne(id);
        
    if(post?.user_id?.id == user_id)
    {
      await this.postsRepository.delete(id);
      return HttpStatus.OK
    }      
    else
      throw new HttpException('Você não tem permissão ou este Post não existe', HttpStatus.NOT_FOUND);      
  }

  async updateDescription(id: number, post: PostEntity, user_id: number): Promise<PostEntity> {
    const current_post: PostEntity = await this.findOne(id)
    
    if(current_post?.user_id?.id == user_id)
    {
      current_post.edition_history.push({ title: current_post.title, description: current_post.description })
      post.edition_history = current_post.edition_history
      this.postsRepository.update(id, post);
      return this.findOne(id)
    }
    else
      throw new HttpException('Você não tem permissão ou este Post não existe', HttpStatus.NOT_FOUND);
  }

  async like(post_id: number, user_id: number): Promise<PostEntity> {
    const post: PostEntity = await this.findOne(post_id)

    if (post.disliked_by.find((value) => value === user_id))
    {
      post.disliked_by = post.disliked_by.filter((value) => value != user_id)
      post.dislikes--;
    }

    if (!post.liked_by.find((value) => value === user_id))          
    {
      post.liked_by.push(user_id)
      post.likes++;
      this.postsRepository.update(post_id, post);
    }
    return post
  }

  async dislike(post_id: number, user_id: number): Promise<PostEntity> {
    const post: PostEntity = await this.findOne(post_id)

    if (post.liked_by.find((value) => value === user_id))      
    {
      post.liked_by = post.liked_by.filter((value) => value != user_id)
      post.likes--;
    }

    if (!post.disliked_by.find((value) => value === user_id))      
    {    
      post.disliked_by.push(user_id)
      post.dislikes++;
      this.postsRepository.update(post_id, post);
    }    
    return post
  }

  async viewed(id: number): Promise<PostEntity> {
    const post: PostEntity = await this.findOne(id)
    post.views++;
    this.postsRepository.update(id, post);
    return this.findOne(id);
  }
}
