import { Module } from '@nestjs/common';
import { OmdbApiController } from './omdb-api.controller';
import { OmdbApiService } from './omdb-api.service';

@Module({
  controllers: [OmdbApiController],
  providers: [OmdbApiService],
  exports: [OmdbApiService],
})
export class OmdbApiModule {}
