import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { selfCheck } from 'src/utils/function';
import { notAllowedMessage } from 'src/utils/variables';

@Injectable()
export class ModeratorRole implements CanActivate {
  constructor(private model: PrismaService, private response: Response) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { params } = context.getArgs()[0];
    if ((req.user && params.tai_khoan) || params.ma_phim) {
      const { currentUser, handlingUser } = await selfCheck(req.user, params);
      const userInfo = await this.model.nguoi_dung.findFirst({
        where: {
          tai_khoan: currentUser,
        },
      });
      if (currentUser === handlingUser) return true;
      else if (userInfo.loai_nguoi_dung >= 3) return true;
      else
        throw new HttpException(this.response.failRes(notAllowedMessage), 400);
    }
    const userInfo = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: +req.user.tai_khoan,
      },
    });
    if (userInfo.loai_nguoi_dung >= 3) return true;
    else throw new HttpException(this.response.failRes(notAllowedMessage), 400);
  }
}
