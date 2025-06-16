import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost'],
        queue: 'post_queue',
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
  console.log('Post service listening on RabbitMQ');
}
bootstrap();
