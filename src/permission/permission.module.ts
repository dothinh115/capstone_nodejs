import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { PerrmissionController } from './permission.controller';
import { PermissionProvider } from './permission.service';

@Module({
  imports: [PermissionModule, PrismaModule],
  controllers: [PerrmissionController],
  providers: [PermissionProvider, Response],
})
export class PermissionModule {}
