import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminCheck implements NestMiddleware {
  constructor(private model: PrismaService) {}
  async use(req: any, res: any, next: NextFunction) {
    let { authorization } = req.headers;
    if (!authorization) throw new HttpException('Không đủ quyền', 400);
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
