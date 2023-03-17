import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersProvider {
  private model = new PrismaClient();
  async getAllUsers() {
    return await this.model.nguoi_dung.findMany();
  }
}
