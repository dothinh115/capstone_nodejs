import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { notExistedUserMessage } from 'src/utils/variables';
import { UpdateUserDto } from './dto/users.dto';

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

  async updateUser(tai_khoan: number, body: UpdateUserDto): Promise<UserDto> {
    const user = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: +tai_khoan,
      },
    });
    if (!user)
      throw new HttpException(
        this.response.failRes(notExistedUserMessage),
        400,
      );
    const data: UpdateUserDto = {
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
