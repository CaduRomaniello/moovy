import { IsString } from 'class-validator';

export class DeleteMovieDto {
  @IsString()
  imdbId: string;
}
