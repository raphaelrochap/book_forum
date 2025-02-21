
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('book_forum')
  constructor(    
    private usersService: UsersService,
    private jwtService: JwtService,    
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string, user: UserEntity }> {
    const user = await this.usersService.findOne(email);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
        
    const payload = { sub: user.id, name: user.name, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
  }
}
