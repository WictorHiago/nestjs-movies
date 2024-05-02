import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
