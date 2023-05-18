import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @ApiProperty()
  imdbId: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  @ApiProperty()
  userRating: number;
}
