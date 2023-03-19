import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { Response } from 'src/utils/dto/global.dto';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.service';
import { Response as Res } from 'src/utils/dto/global.dto';
import { AdminRole } from 'src/guards/admin.guard';

@Module({
  imports: [UserModule, JwtModule, ConfigModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersProvider, Response, JwtStrategy, Res, AdminRole],
})
export class UserModule {}
