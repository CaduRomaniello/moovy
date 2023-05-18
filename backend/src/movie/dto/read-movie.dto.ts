import { IsString } from 'class-validator';

export class ReadMovieDto {
  @IsString()
  imdbId: string;
}
