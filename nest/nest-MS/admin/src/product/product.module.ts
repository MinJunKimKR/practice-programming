import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://zzidqkxe:z2e0GW355FMC3zxulKHtheowLCVx6k98@dingo.rmq.cloudamqp.com/zzidqkxe',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
