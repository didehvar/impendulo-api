import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import './config';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TransformInterceptor } from './transform.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.APP_URL,
      allowedHeaders: 'Authorization',
      methods: 'GET, POST',
    },
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
