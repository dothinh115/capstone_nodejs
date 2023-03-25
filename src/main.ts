import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.use(express.static('.'));

  await app.listen(process.env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
//yarn add @nestjs/swagger swagger-ui-express
