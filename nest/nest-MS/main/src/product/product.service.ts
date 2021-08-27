import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async create(data): Promise<Product> {
    return new this.productModel(data).save();
  }
  async update(id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data);
  }
  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }
  async delete(id: number): Promise<any> {
    await this.productModel.deleteOne({ id });
  }
}
