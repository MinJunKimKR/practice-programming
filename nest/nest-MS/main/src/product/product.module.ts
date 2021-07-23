import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { Product, productSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
