import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteMovieDto {
  @IsString()
  @ApiProperty()
  imdbId: string;
}
