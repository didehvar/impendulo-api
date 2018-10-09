import 'dotenv/config';
import { NestFactory, Reflector, HTTP_SERVER_REF } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { TransformInterceptor } from './transform.interceptor';
import { logger } from './logger.middleware';
import { ExceptionsFilter } from './exceptions.filter';

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

  app.use(logger);
  app.useGlobalFilters(new ExceptionsFilter(app.get(HTTP_SERVER_REF)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
