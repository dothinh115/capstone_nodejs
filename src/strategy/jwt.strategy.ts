import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { userConfig } from 'src/utils/function';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private model: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }
  async validate(payload: { tai_khoan: number }): Promise<UserDto> {
    const userData = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: payload.tai_khoan,
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
    return userConfig(userData);
  }
}
