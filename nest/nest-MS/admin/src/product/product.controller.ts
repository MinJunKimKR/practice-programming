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
    return this.productService.all();
  }
  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    // return this.productService.create({ title, image });
    const product = await this.productService.create({ title, image });

    this.client.emit('product_created', product);
    return product;
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
    // return this.productService.update(id, { title, image });;

    await this.productService.update(id, { title, image });
    const product = await this.productService.get(id);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    // return this.productService.delete(id);
    await this.productService.delete(id);
    this.client.emit('product_deleted', id);
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    const product = await this.productService.get(id);
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }
}
