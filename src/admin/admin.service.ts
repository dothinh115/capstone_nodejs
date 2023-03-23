import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { movieImgPath } from 'src/utils/variables';
@Injectable()
export class AdminProvider {
  constructor(private model: PrismaService) {}
  async imgSync() {
    try {
      const movieList = await this.model.phim.findMany();
      fs.readdir(movieImgPath, (err, files) => {
        files.forEach((file) => {
          const find = movieList.find((item) => item.hinh_anh === file);
          if (!find) {
            if (file !== 'cinemas') fs.unlinkSync(`${movieImgPath + file}`);
          }
        });
      });
    } catch (error) {
      return error;
    }
  }

  async movieSync() {
    const movieList = await this.model.phim.findMany();
    fs.readdir(movieImgPath, async (err, files) => {
      for (let movie of movieList) {
        const find = await files.find((file) => movie.hinh_anh === file);
        if (!find)
          await this.model.phim.delete({
            where: {
              ma_phim: movie.ma_phim,
            },
          });
      }
    });
  }
}
