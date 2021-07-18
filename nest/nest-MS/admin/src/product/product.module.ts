import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
})
export class ProductModule {}
