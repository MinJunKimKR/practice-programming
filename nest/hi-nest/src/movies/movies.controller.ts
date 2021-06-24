import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'movies';
  }
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `one movie id: ${movieId}`;
  }
  @Post()
  create() {
    return 'This will create a movie';
  }
  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie with the id : ${movieId}`;
  }
  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `this will patch a movie with the id : ${movieId}`;
  }
}
