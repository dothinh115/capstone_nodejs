import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionProvider } from './permission.service';

@Module({
  imports: [PermissionModule, PrismaModule],
  providers: [PermissionProvider],
  exports: [PermissionProvider],
})
export class PermissionModule {}
