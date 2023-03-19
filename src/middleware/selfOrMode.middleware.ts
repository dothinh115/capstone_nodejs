import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response as Res } from 'src/utils/dto/global.dto';
import { extractToken } from 'src/utils/function';
import { notAllowedMessage } from 'src/utils/variables';

@Injectable()
export class SelfOrModeMidlleWare implements NestMiddleware {
  constructor(private model: PrismaService, private response: Res) {}
  async use(req: any, res: Response, next: NextFunction) {
    const { tai_khoan } = req.params;
    const { authorization } = req.headers;
    const user = extractToken(authorization);
    const modeCheck = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: user['tai_khoan'],
      },
    });
    if (modeCheck.loai_nguoi_dung >= 3) {
      next();
      return;
    }

    if (user['tai_khoan'] === +tai_khoan) {
      next();
      return;
    }

    throw new HttpException(this.response.failRes(notAllowedMessage), 400);
  }
}
