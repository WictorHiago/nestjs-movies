import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { MovieDto } from '../dto/movieDto';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(movie: MovieDto): Promise<Movie> {
    try {
      if (!movie.name || !movie.description)
        throw new HttpException('Bad Request', 400);

      const movieExist = await this.movieRepository.findOneBy({
        name: movie.name,
      });
      if (movieExist) throw new HttpException('Movie already exists', 200);

      return this.movieRepository.save(movie);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new HttpException('Movie not found', 404);
    return movie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async update(id: number, movie: MovieDto): Promise<Movie> {
    const movieExist = await this.movieRepository.findOneBy({ id });

    if (!movieExist)
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);

    await this.movieRepository.update(id, movie);

    return this.movieRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const movieExist = await this.movieRepository.findOneBy({ id });
    if (!movieExist)
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    await this.movieRepository.delete(id);
  }
}
