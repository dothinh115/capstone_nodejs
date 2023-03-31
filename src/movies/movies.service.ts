import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import {
  keywordsRequiredMessage,
  makeSenseInfoMessage,
  movieImgPath,
  movieImgResponse,
  notExistedMovieMessage,
  pageOrLimitRequiredMessage,
} from 'src/utils/variables';
import * as fs from 'fs';
import { MovieCreateDto, MovieUpdateDto } from './dto/movies.dto';
import { movieConfig } from 'src/utils/config';
import { createDateAsUTC } from 'src/utils/function';

@Injectable()
export class MoviesProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createNewMovie(
    file: Express.Multer.File,
    body: MovieCreateDto,
    tai_khoan: number,
  ) {
    const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu, ...others } =
      body;
    const data = {
      ...others,
      ngay_khoi_chieu: createDateAsUTC(new Date(ngay_khoi_chieu)),
      danh_gia: +danh_gia,
      hot: +hot === 1 ? true : false,
      dang_chieu: +dang_chieu === 1 ? true : false,
      sap_chieu: +sap_chieu === 1 ? true : false,
      hinh_anh: file.filename,
      tai_khoan,
    };
    const newMovie = await this.model.phim.create({
      data,
    });
    const result = await this.model.phim.findFirst({
      where: {
        ma_phim: newMovie.ma_phim,
      },
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
    });

    await this.model.banner.create({
      data: {
        ma_phim: result.ma_phim,
        hinh_anh: result.hinh_anh,
      },
    });
    return result;
  }

  async deleteMovie(ma_phim: number) {
    const movie = await this.model.phim.findFirst({
      where: {
        ma_phim: Number(ma_phim),
      },
    });
    if (!movie)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        400,
      );
    const showTimes = await this.model.lich_chieu.findMany({
      where: {
        ma_phim: +ma_phim,
      },
    });
    if (showTimes.length !== 0) {
      for (let value of showTimes) {
        const orders = await this.model.dat_ve.findMany({
          where: {
            ma_lich_chieu: value.ma_lich_chieu,
          },
        });
        if (orders.length !== 0) {
          await this.model.dat_ve.deleteMany({
            where: {
              ma_lich_chieu: value.ma_lich_chieu,
            },
          });
        }
        await this.model.lich_chieu.delete({
          where: {
            ma_lich_chieu: value.ma_lich_chieu,
          },
        });
      }
    }
    const checkBanner = await this.model.banner.findFirst({
      where: {
        ma_phim: +ma_phim,
      },
    });
    if (checkBanner) {
      await this.model.banner.delete({
        where: {
          ma_banner: checkBanner.ma_banner,
        },
      });
    }
    fs.readFile(movieImgPath + movie.hinh_anh, (err, file) => {
      if (file) fs.unlinkSync(movieImgPath + movie.hinh_anh);
    });

    await this.model.phim.delete({
      where: {
        ma_phim: +ma_phim,
      },
    });
  }

  async getMovieInfo(ma_phim) {
    const result = await this.model.phim.findFirst({
      where: {
        ma_phim: +ma_phim,
      },
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
    });
    if (!result)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        400,
      );
    return result;
  }

  async updateMovie(
    file: Express.Multer.File,
    body: MovieUpdateDto,
    ma_phim: string,
  ) {
    const phim = await this.model.phim.findFirst({
      where: {
        ma_phim: +ma_phim,
      },
    });
    if (!phim)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        400,
      );

    const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu, ...others } =
      body;
    const data = {
      ...others,
      ...(ngay_khoi_chieu && {
        ngay_khoi_chieu: createDateAsUTC(new Date(ngay_khoi_chieu)),
      }),
      ...(danh_gia && { danh_gia: +danh_gia }),
      ...(hot && { hot: +hot === 1 ? true : false }),
      ...(dang_chieu && { dang_chieu: +dang_chieu === 1 ? true : false }),
      ...(sap_chieu && { sap_chieu: +sap_chieu === 1 ? true : false }),
      ...(file && { hinh_anh: file.filename }),
    };
    if (file) fs.unlinkSync(movieImgPath + phim.hinh_anh);
    return await this.model.phim.update({
      data,
      where: {
        ma_phim: +ma_phim,
      },
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
    });
  }
  async getMovieFromDateToDate(
    from: string,
    to: string,
    number?: null | string,
    sort?: any,
  ) {
    if (number && +number < 1)
      throw new HttpException('number không thể bé hơn 1', 400);
    const data = await this.model.phim.findMany({
      where: {
        ngay_khoi_chieu: {
          lte: createDateAsUTC(new Date(to)),
          gte: createDateAsUTC(new Date(from)),
        },
      },
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
      ...(number && { take: +number }),
      ...(sort && {
        orderBy: {
          ngay_khoi_chieu: sort,
        },
      }),
    });
    for (let key in data) {
      data[key] = movieConfig(data[key]);
    }
    return data;
  }

  async getMovieByQuantity(number: string, sort?: any) {
    if (+number < 1) throw new HttpException('number không thể bé hơn 1', 400);
    const dataQuantity = await this.model.phim.findMany({
      take: +number,
      include: {
        nguoi_dung: {
          include: {
            permission: {
              select: { permission_name: true },
            },
          },
        },
      },
      ...(sort && {
        orderBy: {
          ngay_khoi_chieu: sort,
        },
      }),
    });
    for (const key in dataQuantity) {
      dataQuantity[key] = movieConfig(dataQuantity[key]);
    }
    return dataQuantity;
  }

  async getMovieByName(keywords: string, page: string, limit: string) {
    if (!keywords)
      throw new HttpException(
        this.response.failRes(keywordsRequiredMessage),
        400,
      );
    if (page || limit) {
      if (!page || !limit) {
        throw new HttpException(
          this.response.failRes(pageOrLimitRequiredMessage),
          400,
        );
      }
      if (+page <= 0 || +limit <= 0)
        throw new HttpException(
          this.response.failRes(makeSenseInfoMessage),
          400,
        );
    }

    const exist = await this.model.phim.findMany({
      where: {
        ten_phim: {
          contains: keywords,
        },
      },
    });
    if (exist.length === 0)
      throw new HttpException(
        this.response.failRes(notExistedMovieMessage),
        400,
      );

    const result = await this.model.phim.findMany({
      where: {
        ten_phim: {
          contains: keywords,
        },
      },
      ...(page &&
        limit && {
          skip: (+page - 1) * +limit,
          take: +limit,
        }),
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
    });
    for (let key in result) {
      result[key] = movieConfig(result[key]);
    }
    return result;
  }

  async getBanner(ma_phim: string) {
    let result = await this.model.banner.findFirst({
      where: {
        ma_phim: +ma_phim,
      },
    });
    if (!result)
      throw new HttpException(
        this.response.successRes(notExistedMovieMessage),
        400,
      );
    result = {
      ...result,
      hinh_anh: movieImgResponse + result.hinh_anh,
    };
    return result;
  }
}
