import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { OmdbApiModule } from './omdb-api/omdb-api.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'movie-reviews',
      autoLoadEntities: true,
      // entities: [],
      synchronize: true,
    }),
    MovieModule,
    OmdbApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
