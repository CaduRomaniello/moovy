import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  imdbId: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  userRating: number;
}
