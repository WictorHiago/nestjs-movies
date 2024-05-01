import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { movieProviders } from './movie.providers';
import { MovieService } from './movie.service';

@Module({
  imports: [DatabaseModule],
  providers: [...movieProviders, MovieService],
  exports: [MovieService],
})
export class MoviesModule {}
