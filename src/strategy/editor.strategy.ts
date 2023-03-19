import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { notAllowedMessage } from 'src/utils/variables';

@Injectable()
export class EditorStrategy extends PassportStrategy(Strategy, 'editor') {
  constructor(
    configService: ConfigService,
    private model: PrismaService,
    private response: Response,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }
  async validate(payload: { tai_khoan: number }) {
    const userInfo = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: payload.tai_khoan,
      },
    });
    if (userInfo.loai_nguoi_dung < 2)
      throw new HttpException(this.response.failRes(notAllowedMessage), 400);
    return payload;
  }
}
