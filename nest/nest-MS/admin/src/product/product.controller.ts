import { Body, Delete, Inject, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  async all() {
    this.client.emit('hello', 'Hello from Rabbit MQ');
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
