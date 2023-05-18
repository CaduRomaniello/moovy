import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadMovieDto {
  @IsString()
  @ApiProperty()
  imdbId: string;
}
