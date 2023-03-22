import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppProvider } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { dataModule } from './data/data.module';
import { MoviesModule } from './movies/movies.module';
import { OrderModule } from './orders/order.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppModule,
    AuthModule,
    UserModule,
    MoviesModule,
    AdminModule,
    CinemasModule,
    dataModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
