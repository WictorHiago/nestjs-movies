import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { MovieDto } from '../dto/movieDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('save')
  async save(@Body() movie: MovieDto) {
    return await this.movieService.create(movie);
  }

  @ApiOperation({
    summary: 'List all movies',
  })
  @Get('list')
  async list() {
    try {
      return await this.movieService.findAll();
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong', 400);
    }
  }

  @ApiOperation({
    summary: 'Find movie by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.movieService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() movie: MovieDto) {
    try {
      // verify if movie exists
      const movieExist = await this.movieService.findOne(id);
      if (!movieExist) throw new HttpException('Movie not found', 404);

      return await this.movieService.update(id, movie);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const movieExist = await this.movieService.findOne(id);
      if (!movieExist) throw new HttpException('Movie not found', 404);
      await this.movieService.remove(id);
      return { message: 'Movie deleted' };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
