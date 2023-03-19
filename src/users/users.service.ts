import { HttpException, Injectable } from '@nestjs/common';
import { UserBaseDto, UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { userConfig } from 'src/utils/function';
import { notExistedUserMessage } from 'src/utils/variables';

@Injectable()
export class UsersProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async deleteUserProvider(tai_khoan: number) {
    const userInfo = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: Number(tai_khoan),
      },
    });
    if (!userInfo)
      throw new HttpException(
        this.response.failRes(notExistedUserMessage),
        400,
      );
    await this.model.nguoi_dung.delete({
      where: {
        tai_khoan: Number(tai_khoan),
      },
    });
  }

  async getUserInfo(tai_khoan: number) {
    const data = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: Number(tai_khoan),
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
    return data;
  }
  async updateUser(tai_khoan: number, body: UserBaseDto): Promise<UserDto> {
    const data: UserBaseDto = {
      ...body,
    };
    return await this.model.nguoi_dung.update({
      data,
      where: {
        tai_khoan: +tai_khoan,
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
  }
}
