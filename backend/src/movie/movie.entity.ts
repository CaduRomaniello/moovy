import { Exclude } from 'class-transformer';
import { User } from 'src/auth/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imdbId: string;

  @Column()
  title: string;

  @Column('decimal')
  imdbRating: number;

  @Column('decimal')
  userRating: number;

  @Column()
  posterUrl: string;

  @ManyToOne((_type) => User, (user) => user.movies, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
