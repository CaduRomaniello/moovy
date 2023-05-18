import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty()
  imdbId: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  @ApiProperty()
  userRating?: number;
}
