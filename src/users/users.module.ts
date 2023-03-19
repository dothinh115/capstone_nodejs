import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SelfOrModeMidlleWare } from 'src/middleware/selfOrMode.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminStrategy } from 'src/strategy/admin.strategy';
import { EditorStrategy } from 'src/strategy/editor.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { Response } from 'src/utils/dto/global.dto';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.service';
import { Response as Res } from 'src/utils/dto/global.dto';

@Module({
  imports: [UserModule, JwtModule, ConfigModule, PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersProvider,
    Response,
    JwtStrategy,
    AdminStrategy,
    EditorStrategy,
    SelfOrModeMidlleWare,
    Res,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SelfOrModeMidlleWare).forRoutes('/users/update/:tai_khoan');
  }
}
