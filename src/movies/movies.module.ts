import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { movieProviders } from './movie.providers';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [...movieProviders, MovieService],
  exports: [MovieService],
})
export class MoviesModule {}
