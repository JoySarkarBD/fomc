import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: parseInt(process.env.USER_SERVICE_PORT || '3001', 10),
      },
    },
  );
  await app.listen();
  console.log(
    `User Microservice is listening on port ${process.env.USER_SERVICE_PORT || 3001}`,
  );
}
bootstrap();
