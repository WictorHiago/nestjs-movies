import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PublishService } from 'src/redis/publish.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== password) throw new UnauthorizedException();

    const payload = { sub: user.userId, username: user.username };

    const token = await this.jwtService.signAsync(payload);

    // save token in cache
    const redis = new PublishService();
    redis.publish(user.username, token);

    return { access_token: token };
  }
}
