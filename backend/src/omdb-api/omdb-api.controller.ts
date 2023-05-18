import { Body, Controller, Get, Post } from '@nestjs/common';
import { OmdbApiService } from './omdb-api.service';
import { SearchMovieDto } from './dto/search-movies.dto';

@Controller('omdb-api')
export class OmdbApiController {
  constructor(private omdbApiService: OmdbApiService) {}

  @Post('/title')
  searchMoviesByTitle(@Body() searchMovieDto: SearchMovieDto): Promise<string> {
    // console.log('search for title');
    // console.log(`     ${searchMovieDto}`);
    return this.omdbApiService.searchMoviesByTitle(searchMovieDto);
  }

  @Post('/imdb-id')
  searchMoviesByImdbId(
    @Body() searchMovieDto: SearchMovieDto,
  ): Promise<string> {
    return this.omdbApiService.searchMoviesByImdbId(searchMovieDto);
  }
}
