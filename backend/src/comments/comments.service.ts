
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer'
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(CommentEntity)
      private commentsRepository: Repository<CommentEntity>,      
      private usersService: UsersService,
      private postsService: PostsService
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Book Forum" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
      });
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  }

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

  async findAllByPostId(id: number): Promise<CommentEntity[]> {
    const comments: CommentEntity[] = await this.findAll();
    return comments.filter((comment) => (comment.post_id.id == id))
  }

  async save(comment: CommentEntity): Promise<CommentEntity> {
    const post: PostEntity = await this.postsService.findOneById(Number(comment.post_id))
    const userPost: UserEntity = await this.usersService.findOneById(Number(post.user_id.id))
    const userComment: UserEntity = await this.usersService.findOneById(Number(comment.user_id))
    this.sendEmail(
      userPost.email,
      'Book Fórum - Alguém comentou em sua publicação!',
      `Olá, ${userPost.name}! Fique de olho na sua rede, um novo comentário foi adicionado por ${userComment.name} na sua publicação. Venha ver! :)`
    )

    return this.commentsRepository.save(comment);    
  }

  async remove(id: number, user_id: number) {
    const current_comment = await this.findOne(id)
    
    if((current_comment?.user_id?.id == user_id) || (current_comment?.post_id.user_id?.id == user_id)){
      current_comment.removed = true
      current_comment.description = ''
      return this.commentsRepository.update(current_comment.id, current_comment);
    }
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