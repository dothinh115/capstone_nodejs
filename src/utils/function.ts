import { HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { movieImgPath } from './variables';
const model = new PrismaClient();
const maxSize = 6000000; //6Mb
const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const userConfig = (obj) => {
  obj = {
    ...obj,
    loai_nguoi_dung: obj.permission.permission_name,
  };
  delete obj['permission'];
  delete obj.mat_khau;
  return obj;
};

export const movieConfig = (obj) => {
  obj = {
    ...obj,
    nguoi_dang: userConfig(obj.nguoi_dung),
  };
  delete obj['tai_khoan'];
  delete obj['nguoi_dung'];
  return obj;
};

export const movieImgCheck = (file) => {
  let errMessage: string;
  if (!file) errMessage = `Phải có hình ảnh!`;
  else {
    const checkFindType = type.find((type) => type === file.mimetype);
    if (!checkFindType) errMessage = `Chỉ được upload hình [jpeg|jpg|png|gif]`;
    if (file.size > maxSize) errMessage = `Tối đa ${maxSize / 1000000}Mb!`;
  }

  if (errMessage) {
    if (file) fs.unlinkSync(file.destination + '/' + file.filename);
    throw new HttpException(errMessage, 400);
  }
};

export const selfCheck = async (user, params) => {
  const currentUser = user.tai_khoan;
  let handlingUser;
  if (params.tai_khoan) handlingUser = params.tai_khoan;
  else if (params.ma_phim) {
    const phim = await model.phim.findFirst({
      where: {
        ma_phim: +params.ma_phim,
      },
    });
    if (!phim) throw new HttpException('Không tìm thấy phim này!', 400);
    handlingUser = phim.tai_khoan;
  }
  return {
    currentUser,
    handlingUser,
  };
};

export const imgSync = async () => {
  const movieList = await model.phim.findMany();
  fs.readdir(movieImgPath, (err, files) => {
    files.forEach((file) => {
      const find = movieList.find((item) => item.hinh_anh === file);
      if (!find) fs.unlinkSync(`${movieImgPath + file}`);
    });
  });
};
