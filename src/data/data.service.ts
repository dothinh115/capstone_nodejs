import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { showTimesConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import {
  cinemaNotFoundMessage,
  notExistedMovieMessage,
} from 'src/utils/variables';
import { ShowTimeCreateDto } from './Dto/data.dto';

@Injectable()
export class dataProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createShowTime(body: ShowTimeCreateDto) {
    const data = {
      ...body,
      ngay_gio_chieu: new Date(body.ngay_gio_chieu),
    };
    const checkIfCinemaExist = await this.model.rap_phim.findFirst({
      where: {
        ma_rap: +body.ma_rap,
      },
    });
    if (!checkIfCinemaExist)
      throw new HttpException(
        this.response.failRes(cinemaNotFoundMessage),
        400,
      );
    const checkIfMovieExist = await this.model.phim.findFirst({
      where: {
        ma_phim: +body.ma_phim,
      },
    });
    if (!checkIfMovieExist)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        400,
      );
    let result = await this.model.lich_chieu.create({
      data,
      include: {
        rap_phim: {
          include: {
            cum_rap: {
              include: {
                he_thong_rap: true,
              },
            },
          },
        },
        phim: {
          include: {
            nguoi_dung: {
              include: {
                permission: {
                  select: {
                    permission_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return showTimesConfig(result);
  }
}
