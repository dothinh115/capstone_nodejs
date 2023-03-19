import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { movieImgCheck } from 'src/utils/function';
import { movieImgPath, notExistedMovieMessage } from 'src/utils/variables';
import * as fs from 'fs';

@Injectable()
export class MoviesProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createNewMovie(file, body, tai_khoan: number) {
    movieImgCheck(file);
    const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu, ...others } =
      body;
    const data = {
      ...others,
      ngay_khoi_chieu: new Date(ngay_khoi_chieu),
      danh_gia: Number(danh_gia),
      hot: Number(hot) === 1 ? true : false,
      dang_chieu: Number(dang_chieu) === 1 ? true : false,
      sap_chieu: Number(sap_chieu) === 1 ? true : false,
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

  async updateMovie(file, body, ma_phim) {
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

    if (file) movieImgCheck(file);
    const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu, ...others } =
      body;
    const data = {
      ...others,
      ngay_khoi_chieu: new Date(ngay_khoi_chieu),
      danh_gia: Number(danh_gia),
      hot: Number(hot) === 1 ? true : false,
      dang_chieu: Number(dang_chieu) === 1 ? true : false,
      sap_chieu: Number(sap_chieu) === 1 ? true : false,
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
}
