import { ValidationPipe }
from '@nestjs/common';

import { NestFactory }
from '@nestjs/core';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import {
  NestExpressApplication,
} from '@nestjs/platform-express';

import { join }
from 'path';

import * as express
from 'express';

import { AppModule }
from './app.module';

async function bootstrap() {

  const app =

    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.enableCors();

  app.use(

    '/uploads',

    express.static(

      join(
        process.cwd(),
        'uploads',
      ),

    ),

  );

  app.use(

    '/invoices',

    express.static(

      join(
        process.cwd(),
        'invoices',
      ),

    ),

  );

  app.useGlobalPipes(

    new ValidationPipe({

      whitelist: true,

      transform: true,

      forbidNonWhitelisted: true,

    }),

  );

  const config =

    new DocumentBuilder()

      .setTitle('PesanSini API')

      .setDescription(
        'Backend PesanSini',
      )

      .setVersion('1.0')

      .addBearerAuth()

      .build();

  const document =

    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );

  await app.listen(3000);

}

bootstrap();