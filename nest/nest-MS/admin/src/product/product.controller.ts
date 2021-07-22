import { Body, Delete, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }
  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({ title, image });
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    return this.productService.update(id, { title, image });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
