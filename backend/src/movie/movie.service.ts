import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OmdbApiService } from 'src/omdb-api/omdb-api.service';
import { SearchMovieDto } from 'src/omdb-api/dto/search-movies.dto';
import { User } from 'src/auth/users.entity';
import { ReadMovieDto } from './dto/read-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private omdbApi: OmdbApiService,
  ) {}

  async readAllMovies(user: User): Promise<Movie[]> {
    const query = this.moviesRepository.createQueryBuilder('movie');
    query.andWhere({ user });

    const tasks = await query.getMany();
    return tasks;
  }

  async readMovie(readMovieDto: ReadMovieDto, user: User): Promise<Movie> {
    const { imdbId } = readMovieDto;
    const found = await this.moviesRepository.findOne({
      where: { imdbId: imdbId, user: user },
    });

    if (!found) {
      throw new NotFoundException(
        `Task with ID "${imdbId} and owner ${user.username} not found`,
      );
    }

    return found;
  }

  async createMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<Movie> {
    const { imdbId, userRating } = createMovieDto;

    // looks for movie in omdb api
    const searchMovieDto = new SearchMovieDto();
    searchMovieDto.imdbId = imdbId;

    const movieData = await this.omdbApi.searchMoviesByImdbId(searchMovieDto);
    const { imdbID, Title, imdbRating, Poster } = JSON.parse(movieData);

    // try to find this movie for this user in the db
    const found = await this.moviesRepository.findOne({
      where: { imdbId: imdbId, user: user },
    });

    // if found it cannot be added again to the db
    if (found) {
      console.log('erro linha 79');
      throw new ConflictException(
        'You already have this movie added to your library',
      );
    }

    // continue creating new movie for logged user
    const movie = this.moviesRepository.create({
      imdbId: imdbID,
      title: Title,
      imdbRating: Number(imdbRating),
      userRating: userRating ? userRating : 0.0,
      posterUrl: Poster,
      user,
    });

    try {
      await this.moviesRepository.save(movie);
      return movie;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMovie(deleteMovieDto: DeleteMovieDto, user: User): Promise<void> {
    const { imdbId } = deleteMovieDto;
    const result = await this.moviesRepository.delete({ imdbId: imdbId, user });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Movie with ID "${imdbId}" and owner "${user.username} not found`,
      );
    }
  }

  async updateMovie(
    updateMovieDto: UpdateMovieDto,
    user: User,
  ): Promise<Movie> {
    const { imdbId, userRating } = updateMovieDto;
    const readMovieDto = new ReadMovieDto();
    readMovieDto.imdbId = imdbId;
    const movie = await this.readMovie(readMovieDto, user);

    movie.userRating = Number(userRating);
    await this.moviesRepository.save(movie);

    return movie;
  }
}
