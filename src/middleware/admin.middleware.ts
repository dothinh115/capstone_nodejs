import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminCheck implements NestMiddleware {
  private model = new PrismaClient();
  async use(req: any, res: any, next: NextFunction) {
    let { authorization } = req.headers;
    authorization = authorization.split(' ')[1];
    const data = jwt.decode(authorization);
    const user = await this.model.nguoi_dung.findUnique({
      where: {
        tai_khoan: data['tai_khoan'],
      },
    });
    if (!user) throw new HttpException('Không đủ quyền', 400);
    if (user.loai_nguoi_dung !== 4)
      throw new HttpException('Không đủ quyền', 400);
    next();
  }
}
