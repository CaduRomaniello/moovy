import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MovieService } from './movie.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { Movie } from './movie.entity';
import { User } from 'src/auth/users.entity';
import { ReadMovieDto } from './dto/read-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';

@Controller('movie')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private moviesService: MovieService) {}

  @Post('/all')
  async readAllMovies(@GetUser() user: User): Promise<Movie[]> {
    return this.moviesService.readAllMovies(user);
  }

  @Get()
  async readMovie(
    @Body() readMovieDto: ReadMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    return this.moviesService.readMovie(readMovieDto, user);
  }

  @Post()
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto, user);
  }

  @Post('/delete')
  async deleteMovie(
    @Body() deleteMovieDto: DeleteMovieDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.moviesService.deleteMovie(deleteMovieDto, user);
  }

  @Patch()
  updateTaskStatus(
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(updateMovieDto, user);
  }
}
