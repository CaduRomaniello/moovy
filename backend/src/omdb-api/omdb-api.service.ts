import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SearchMovieDto } from './dto/search-movies.dto';

@Injectable()
export class OmdbApiService {
  async searchMoviesByTitle(searchMovieDto: SearchMovieDto): Promise<string> {
    // console.log(searchMovieDto);
    return fetch(
      `http://www.omdbapi.com/?apikey=8fc25489&s=${searchMovieDto.title}&r=json&plot=full`,
      {
        method: 'GET',
      },
    )
      .then(async (response) => {
        const r = await response.text();
        return r;
      }) // Parse the response in JSON
      .catch((_err) => {
        throw new ServiceUnavailableException();
      });
  }

  searchMoviesByImdbId(searchMovieDto: SearchMovieDto): Promise<string> {
    return fetch(
      `http://www.omdbapi.com/?apikey=8fc25489&i=${searchMovieDto.imdbId}&r=json`,
      {
        method: 'GET',
      },
    )
      .then(async (response) => {
        const r = await response.text();
        return r;
      }) // Parse the response in JSON
      .catch((_err) => {
        throw new ServiceUnavailableException();
      });
  }
}
