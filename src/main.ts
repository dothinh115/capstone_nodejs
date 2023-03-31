import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PermissionModule } from './permission/permission.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { DataModule } from './data/data.module';
import { MoviesModule } from './movies/movies.module';
import { OrderModule } from './orders/order.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
  };

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  app.enableCors();
  app.setGlobalPrefix('/api');
  app.use(express.static('.'));

  const options: SwaggerDocumentOptions = {
    include: [
      AuthModule,
      UserModule,
      AdminModule,
      PermissionModule,
      CinemasModule,
      DataModule,
      MoviesModule,
      OrderModule,
    ],
    deepScanRoutes: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Capstone Nodejs API')
    .setDescription('Capstone Nodejs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/swagger', app, document);

  http.createServer(server).listen(process.env.PORT);
  https.createServer(httpsOptions, server).listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
//yarn add @nestjs/swagger swagger-ui-express
