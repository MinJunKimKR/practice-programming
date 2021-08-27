import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private httpService: HttpService,
    private readonly productService: ProductService,
  ) {}
  @Get()
  async all() {
    return this.productService.all();
  }
  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    this.httpService
      .post(`http://localhost:8000/api/product/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });
    return this.productService.update(id, {
      likes: parseInt(product.likes) + 1,
    });
  }
  // @EventPattern('hello')
  // async hello(data: string) {
  //   console.log(data);
  // }
  @EventPattern('product_created')
  async productCreate(product) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }
  @EventPattern('product_updated')
  async productUpdate(product) {
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }
  @EventPattern('product_deleted')
  async productDelete(id: number) {
    await this.productService.delete(id);
  }
}
