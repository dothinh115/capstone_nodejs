import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CinemasComplexCreateDto,
  CinemasCreateDto,
  CinemasSystemCreateDto,
} from './dto/cinemas.dto';
import * as fs from 'fs';
import { Response } from 'src/utils/dto/global.dto';
import {
  cinemaComplexNotFoundMessage,
  cinemaImgPath,
  cinemaSystemNotFoundMessage,
} from 'src/utils/variables';
import { cinemaComplexConfig, cinemaSystemConfig } from 'src/utils/config';
@Injectable()
export class CinemasProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createCinemaSystem(data: CinemasSystemCreateDto, file) {
    const newData = {
      ...data,
      logo: file.filename,
    };
    return await this.model.he_thong_rap.create({ data: newData });
  }

  async deleteCinemaSystem(ma_he_thong_rap: string) {
    const data = await this.model.he_thong_rap.findFirst({
      where: {
        ma_he_thong_rap: +ma_he_thong_rap,
      },
    });
    if (!data)
      throw new HttpException(
        this.response.failRes('không tìm ra cụm rạp này'),
        400,
      );

    await this.model.he_thong_rap.delete({
      where: {
        ma_he_thong_rap: +ma_he_thong_rap,
      },
    });
    fs.unlinkSync(cinemaImgPath + data.logo);
  }
  async getCinemaSystem() {
    const data = await this.model.he_thong_rap.findMany();
    for (let key in data) {
      data[key] = cinemaSystemConfig(data[key]);
    }
    return data;
  }

  async createCinemaComlex(data: CinemasComplexCreateDto) {
    const checkIfExit = await this.model.he_thong_rap.findFirst({
      where: {
        ma_he_thong_rap: +data.ma_he_thong_rap,
      },
    });
    if (!checkIfExit)
      throw new HttpException(
        this.response.failRes(cinemaSystemNotFoundMessage),
        400,
      );
    return await this.model.cum_rap.create({ data });
  }
  async deleteCinemaComlex(ma_cum_rap: string) {
    const data = await this.model.cum_rap.findFirst({
      where: {
        ma_cum_rap: +ma_cum_rap,
      },
    });
    if (!data)
      throw new HttpException(
        this.response.failRes(cinemaComplexNotFoundMessage),
        400,
      );
    return await this.model.cum_rap.delete({
      where: {
        ma_cum_rap: +ma_cum_rap,
      },
    });
  }
  async createCinema(data: CinemasCreateDto) {
    const checkIfExit = await this.model.cum_rap.findFirst({
      where: {
        ma_cum_rap: +data.ma_cum_rap,
      },
    });
    if (!checkIfExit)
      throw new HttpException(
        this.response.failRes(cinemaComplexNotFoundMessage),
        400,
      );
    return await this.model.rap_phim.create({ data });
  }
  async getCinemaComplex() {
    const data = await this.model.cum_rap.findMany({
      include: {
        he_thong_rap: true,
      },
    });
    for (let key in data) {
      data[key] = cinemaComplexConfig(data[key]);
    }
    return data;
  }
}
