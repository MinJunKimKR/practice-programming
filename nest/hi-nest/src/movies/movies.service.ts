import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); //ParseInt(id)
    if (!movie) {
      throw new NotFoundException(`Movie with Id : ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id); //URL로 받아오는것은 전부다 string이기 때문에 number로 변화를 해주는 과정을 거쳐야 한다.
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData }); //2개의 배열을 1개의 배열로 만들어서 push 하는 소스
  }
}
