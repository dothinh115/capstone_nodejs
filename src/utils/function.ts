import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { invalidTokenMessage } from './variables';
const maxSize = 6000000; //6Mb
const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const userConfig = (obj) => {
  obj = {
    ...obj,
    loai_nguoi_dung: obj.permission.permission_name,
  };
  delete obj['permission'];
  return obj;
};

export const movieConfig = (obj) => {
  obj.nguoi_dung.loai_nguoi_dung = obj.nguoi_dung.permission.permission_name;
  delete obj.nguoi_dung.permission;
  obj = {
    ...obj,
    nguoi_dang: obj.nguoi_dung,
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

export const extractToken = (token) => {
  if (!token) throw new HttpException(invalidTokenMessage, 400);
  token = token.split(' ')[1];
  if (!jwt.verify(token, process.env.SECRET_KEY))
    throw new HttpException(invalidTokenMessage, 400);
  return jwt.decode(token);
};
