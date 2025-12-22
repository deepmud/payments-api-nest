import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    express.json({
      verify: (req: any, _, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true,forbidNonWhitelisted: true }));
  await app.listen(3000);
}
bootstrap();

