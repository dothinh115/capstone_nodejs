import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import {
  imgRequiredMessage,
  movieImgPath,
  notExistedMovieMessage,
  successMessage,
} from 'src/utils/variables';
import * as fs from 'fs';
import { MovieCreateDto } from './dto/movies.dto';
import { movieConfig } from 'src/utils/config';

@Injectable()
export class MoviesProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createNewMovie(
    req,
    file: Express.Multer.File,
    body: MovieCreateDto,
    tai_khoan: number,
  ) {
    if (req.imgValidationErrorMessage) {
      throw new HttpException(
        this.response.failRes(req.imgValidationErrorMessage),
        400,
      );
    }
    if (!file)
      throw new HttpException(this.response.failRes(imgRequiredMessage), 400);
    const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu, ...others } =
      body;
    const data = {
      ...others,
      ngay_khoi_chieu: new Date(ngay_khoi_chieu),
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
    body: MovieCreateDto,
    ma_phim: string,
  ) {
    if (req.imgValidationErrorMessage) {
      throw new HttpException(
        this.response.failRes(req.imgValidationErrorMessage),
        400,
      );
    }
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
      ngay_khoi_chieu: new Date(ngay_khoi_chieu),
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
    sort?: null | string,
  ) {
    const data = await this.model.phim.findMany({
      where: {
        ngay_khoi_chieu: {
          lte: new Date(to),
          gte: new Date(from),
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
      ...(sort === 'desc' && {
        orderBy: {
          ngay_khoi_chieu: 'desc',
        },
      }),
      ...(sort === 'asc' && {
        orderBy: {
          ngay_khoi_chieu: 'asc',
        },
      }),
    });
    for (let key in data) {
      data[key] = movieConfig(data[key]);
    }
    return data;
  }

  async getMovieByQuantity(number: string, sort?: null | string) {
    if (+number === 0) throw new HttpException('number không thể là 0', 400);
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
      ...(sort === 'desc' && {
        orderBy: {
          ngay_khoi_chieu: 'desc',
        },
      }),
      ...(sort === 'asc' && {
        orderBy: {
          ngay_khoi_chieu: 'asc',
        },
      }),
    });
    for (const key in dataQuantity) {
      dataQuantity[key] = movieConfig(dataQuantity[key]);
    }
    return dataQuantity;
  }
}
