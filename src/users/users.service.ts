import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { permissionConfig, userConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import {
  alreadyBannedMessage,
  higherPermissionSetNotAllowedMessage,
  notBannedMessage,
  notEnoughRightsBanMessage,
  notEnoughRightsPermissionMessage,
  notExistedUserMessage,
  selfBanNotAllowed,
  selfDeteleNotAllowed,
  selfSetPermissionNotAllowedMessage,
} from 'src/utils/variables';
import { SetPermissionDto, UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async deleteUserProvider(tai_khoan: number, user) {
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
    if (userInfo.tai_khoan === user.tai_khoan)
      throw new HttpException(this.response.failRes(selfDeteleNotAllowed), 400);
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
  async banUser(tai_khoan: string, req: any) {
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
    if (req.user.tai_khoan === +tai_khoan)
      throw new HttpException(this.response.failRes(selfBanNotAllowed), 400);

    if (req.user.loai_nguoi_dung < user.loai_nguoi_dung)
      throw new HttpException(
        this.response.failRes(notEnoughRightsBanMessage),
        400,
      );
    if (user.loai_nguoi_dung === permissionConfig.Banned)
      throw new HttpException(this.response.failRes(alreadyBannedMessage), 400);
    const data = await this.model.nguoi_dung.update({
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
      data: {
        loai_nguoi_dung: 0,
      },
    });
    return userConfig(data);
  }

  async unBanUser(tai_khoan: string) {
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
    if (user.loai_nguoi_dung !== permissionConfig.Banned)
      throw new HttpException(this.response.failRes(notBannedMessage), 200);
    const data = await this.model.nguoi_dung.update({
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
      data: {
        loai_nguoi_dung: 1,
      },
    });
    return userConfig(data);
  }
  async setPermission(data: SetPermissionDto, req: any) {
    const user = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: +data.tai_khoan,
      },
    });
    if (!user)
      throw new HttpException(
        this.response.failRes(notExistedUserMessage),
        400,
      );
    if (req.user.tai_khoan === data.tai_khoan)
      throw new HttpException(
        this.response.failRes(selfSetPermissionNotAllowedMessage),
        400,
      );
    if (req.user.loai_nguoi_dung < user.loai_nguoi_dung)
      throw new HttpException(
        this.response.failRes(notEnoughRightsPermissionMessage),
        400,
      );
    if (data.loai_nguoi_dung > req.user.loai_nguoi_dung)
      throw new HttpException(
        this.response.failRes(higherPermissionSetNotAllowedMessage),
        400,
      );

    const result = await this.model.nguoi_dung.update({
      data: {
        loai_nguoi_dung: data.loai_nguoi_dung,
      },
      where: {
        tai_khoan: data.tai_khoan,
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
    return userConfig(result);
  }
  async getAllUser() {
    const data = await this.model.nguoi_dung.findMany({
      include: {
        permission: true,
      },
    });
    for (const key in data) {
      data[key] = userConfig(data[key]);
    }
    return data;
  }
  async getUserPageDivision(page = '1', limit = '10') {
    const skip = (+page - 1) * +limit;
    let result = await this.model.nguoi_dung.findMany({
      skip,
      take: +limit,
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });

    for (let key in result) {
      result[key] = userConfig(result[key]);
    }
    return result;
  }

  async getUser(keyword: string) {
    let result = await this.model.nguoi_dung.findMany({
      where: {
        OR: [
          {
            ho_ten: { contains: keyword },
          },
          {
            email: { contains: keyword },
          },
        ],
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });

    for (let key in result) {
      result[key] = userConfig(result[key]);
    }
    return result;
  }
}
