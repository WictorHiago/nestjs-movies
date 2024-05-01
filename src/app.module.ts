import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { MovieService } from './movies/movie.service';
import { databaseProviders } from './database/database.providers';
import { movieProviders } from './movies/movie.providers';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, MoviesModule],
  controllers: [AppController],
  providers: [
    AppService,
    MovieService,
    ...databaseProviders,
    ...movieProviders,
  ],
})
export class AppModule {}
