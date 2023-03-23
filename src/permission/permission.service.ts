import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionProvider {
  constructor(private model: PrismaService) {}
  async getAllPermission() {
    const permission: any = await this.model.permission.findMany();
    let permissionObj = {};
    for (let key in permission) {
      permissionObj = {
        ...permissionObj,
        [permission[key].permission_name]: permission[key].permission_value,
      };
    }
    return permissionObj;
  }
}
