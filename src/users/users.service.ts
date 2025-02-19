import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
