import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionProvider {
  constructor(private model: PrismaService) {}
  async getAllPermission() {
    const permission = await this.model.permission.findMany();

    return permission;
  }
}
