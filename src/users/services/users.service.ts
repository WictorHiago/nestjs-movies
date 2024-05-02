import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      console.log('User not found');
      return undefined;
    }

    return user;
  }
}
