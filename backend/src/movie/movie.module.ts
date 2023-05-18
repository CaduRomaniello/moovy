import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OmdbApiModule } from 'src/omdb-api/omdb-api.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule, OmdbApiModule],
  exports: [MovieService],
})
export class MovieModule {}
