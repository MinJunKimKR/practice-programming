import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  app.listen();
}

bootstrap();
