import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { movieImgPath, notExistedMovieMessage } from 'src/utils/variables';
import * as fs from 'fs';
import { MovieCreateDto, MovieUpdateDto } from './dto/movies.dto';
import { movieConfig } from 'src/utils/config';
import { createDateAsUTC } from 'src/utils/function';

@Injectable()
export class MoviesProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createNewMovie(
    req,
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
    return await this.model.phim.findFirst({
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
    await this.model.phim.delete({
      where: {
        ma_phim: Number(ma_phim),
      },
    });
    fs.unlinkSync(movieImgPath + movie.hinh_anh);
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
    req: any,
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
      ngay_khoi_chieu: createDateAsUTC(new Date(ngay_khoi_chieu)),
      danh_gia: +danh_gia,
      hot: +hot === 1 ? true : false,
      dang_chieu: +dang_chieu === 1 ? true : false,
      sap_chieu: +sap_chieu === 1 ? true : false,
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
}
