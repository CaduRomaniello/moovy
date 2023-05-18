import { ApiProperty } from '@nestjs/swagger';

export class SearchMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  imdbId?: string;
}
