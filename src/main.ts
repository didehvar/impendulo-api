import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as pino from 'pino';
import * as expressPino from 'express-pino-logger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { TransformInterceptor } from './transform.interceptor';

declare const module: any;

async function bootstrap() {
  const reflector = new Reflector();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.APP_URL,
      allowedHeaders: 'Authorization',
      methods: 'GET, POST',
    },
  });

  const logger = pino({
    prettyPrint: process.env.NODE_ENV === 'development',
    level:
      process.env.LOG_LEVEL ||
      (process.env.NODE_ENV === 'development' ? 'debug' : 'error'),
  });

  app.enableCors();

  app.use(expressPino({ logger }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
