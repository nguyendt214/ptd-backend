import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8080', // Replace with the origin you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable set cookies for cross-origin requests
  });

  await app.listen(3000);
}
bootstrap();
