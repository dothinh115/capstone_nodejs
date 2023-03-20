import { movieImgPath } from './variables';

export const permissionConfig = {
  Banned: 0,
  Members: 1,
  Editors: 2,
  Moderators: 3,
  Administrators: 4,
};

export const maxSize = 6000000; //6Mb

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
    hinh_anh: movieImgPath + obj.hinh_anh,
  };
  delete obj['tai_khoan'];
  delete obj['nguoi_dung'];
  return obj;
};
