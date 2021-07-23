import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  // });
  // await app.listen(8001);
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
  await app.listen();
}

bootstrap();
