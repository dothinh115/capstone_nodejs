import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, Response],
})
export class AuthModule {}
