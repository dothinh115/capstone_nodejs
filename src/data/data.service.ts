import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { seatConfig, showTimesConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { createDateAsUTC } from 'src/utils/function';
import {
  alreadyExistedshowTimeMessage,
  cinemaNotFoundMessage,
  notExistedMovieMessage,
  seatNotFoundMessage,
  showTimeNotFoundMessage,
} from 'src/utils/variables';
import {
  SeatCreateDto,
  SeatUpdateDto,
  ShowTimeCreateDto,
} from './Dto/data.dto';

@Injectable()
export class DataProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createShowTime(body: ShowTimeCreateDto) {
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

    const date: Date = new Date(body.ngay_gio_chieu);

    const ngay_gio_chieu: Date = createDateAsUTC(date);

    const checkShowTime = await this.model.lich_chieu.findFirst({
      where: {
        AND: [
          { ma_rap: +body.ma_rap },
          { ma_phim: +body.ma_phim },
          {
            ngay_gio_chieu,
          },
        ],
      },
    });
    if (checkShowTime)
      throw new HttpException(
        this.response.failRes(alreadyExistedshowTimeMessage),
        400,
      );

    const data = {
      ...body,
      ngay_gio_chieu,
    };
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
  async deleteShowTime(ma_lich_chieu: string) {
    const checkIfShowTimeExist = await this.model.lich_chieu.findFirst({
      where: {
        ma_lich_chieu: +ma_lich_chieu,
      },
    });
    if (!checkIfShowTimeExist)
      throw new HttpException(
        this.response.failRes(showTimeNotFoundMessage),
        400,
      );
    await this.model.lich_chieu.delete({
      where: {
        ma_lich_chieu: +ma_lich_chieu,
      },
    });
  }
  async getShowTimeFromDateToDate(
    from: string,
    to: string,
    number?: string,
    sort?: any,
  ) {
    if (+number && +number < 1)
      throw new HttpException('number không thể bé hơn 1', 400);
    const result = await this.model.lich_chieu.findMany({
      where: {
        ngay_gio_chieu: {
          lte: createDateAsUTC(new Date(to)),
          gte: createDateAsUTC(new Date(from)),
        },
      },
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
      ...(number && { take: +number }),
      ...(sort && {
        orderBy: {
          ngay_gio_chieu: sort,
        },
      }),
    });

    for (let key in result) {
      result[key] = showTimesConfig(result[key]);
    }

    return result;
  }

  async getShowTimeByQuantity(number: string | null, sort?: any) {
    if (+number < 1) throw new HttpException('number không thể bé hơn 1', 400);
    const result = await this.model.lich_chieu.findMany({
      take: +number,
      ...(sort && {
        orderBy: {
          ngay_gio_chieu: sort,
        },
      }),
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
    for (let key in result) {
      result[key] = showTimesConfig(result[key]);
    }
    return result;
  }
  async createSeat(data: SeatCreateDto) {
    const cinema = await this.model.rap_phim.findFirst({
      where: {
        ma_rap: +data.ma_rap,
      },
    });
    if (!cinema)
      throw new HttpException(
        this.response.failRes(cinemaNotFoundMessage),
        400,
      );
    const result = await this.model.ghe.create({
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
      },
    });
    return seatConfig(result);
  }

  async deleteSeat(ma_ghe: string) {
    const seat = await this.model.ghe.findFirst({
      where: {
        ma_ghe: +ma_ghe,
      },
    });
    if (!seat)
      throw new HttpException(this.response.failRes(seatNotFoundMessage), 400);
    await this.model.ghe.delete({
      where: {
        ma_ghe: +ma_ghe,
      },
    });
  }

  async getSeatByCinema(ma_rap: string) {
    const seat = await this.model.rap_phim.findFirst({
      where: {
        ma_rap: +ma_rap,
      },
    });
    if (!seat)
      throw new HttpException(
        this.response.failRes(cinemaNotFoundMessage),
        400,
      );
    const result = await this.model.ghe.findMany({
      where: {
        ma_rap: +ma_rap,
      },
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
      },
    });
    for (let key in result) {
      result[key] = seatConfig(result[key]);
    }
    return result;
  }

  async updateSeat(ma_ghe: string, body: SeatUpdateDto) {
    const seat = await this.model.ghe.findFirst({
      where: {
        ma_ghe: +ma_ghe,
      },
    });
    if (!seat)
      throw new HttpException(this.response.failRes(seatNotFoundMessage), 400);
    const result = await this.model.ghe.update({
      data: body,
      where: {
        ma_ghe: +ma_ghe,
      },
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
      },
    });
    return seatConfig(result);
  }
  async getShowTimeByMovie(ma_phim: string) {
    const checkIfMovieExist = await this.model.phim.findFirst({
      where: {
        ma_phim: +ma_phim,
      },
    });
    if (!checkIfMovieExist)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        200,
      );
    const result = await this.model.lich_chieu.findMany({
      where: {
        ma_phim: +ma_phim,
      },
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
    for (let key in result) {
      result[key] = showTimesConfig(result[key]);
    }
    return result;
  }
}
