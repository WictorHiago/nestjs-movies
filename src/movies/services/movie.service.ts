import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new HttpException('Movie not found', 404);
    return movie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async update(id: number, movie: Movie): Promise<Movie> {
    const movieExist = await this.movieRepository.findOneBy({ id });

    if (!movieExist) throw new HttpException('Movie not found', 404);

    await this.movieRepository.update(id, movie);

    return this.movieRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const movieExist = await this.movieRepository.findOneBy({ id });
    if (!movieExist) throw new HttpException('Movie not found', 404);
    await this.movieRepository.delete(id);
  }
}
