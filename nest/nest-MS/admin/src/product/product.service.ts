import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async get(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id, data): Promise<any> {
    return this.productRepository.update(id, data);
  }
  async delete(id): Promise<any> {
    return this.productRepository.delete(id);
  }
}
