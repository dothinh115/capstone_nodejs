import { Module } from '@nestjs/common';
import { AdminRole } from 'src/guards/admin.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { Response } from 'src/utils/dto/global.dto';
import { AdminController } from './admin.controller';

@Module({
  imports: [AdminModule, PrismaModule],
  controllers: [AdminController],
  providers: [JwtStrategy, AdminRole, Response],
})
export class AdminModule {}
