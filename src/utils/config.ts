import { movieImgResponse, systemImgResponse } from './variables';

export const permissionConfig = {
  Banned: 0,
  Members: 1,
  Editors: 2,
  Moderators: 3,
  Administrators: 4,
};

export const userConfig = (obj) => {
  //cần include permission
  obj = {
    ...obj,
    loai_nguoi_dung: obj.permission.permission_name,
  };
  delete obj['permission'];
  obj.mat_khau && delete obj.mat_khau;
  return obj;
};

export const movieConfig = (obj) => {
  //cần include nguoi_dung && permission
  obj = {
    ...obj,
    nguoi_dang: userConfig(obj.nguoi_dung),
    hinh_anh: movieImgResponse + obj.hinh_anh,
  };
  delete obj['tai_khoan'];
  delete obj['nguoi_dung'];
  return obj;
};

export const cinemaSystemConfig = (obj) => {
  obj = {
    ...obj,
    logo: systemImgResponse + obj.logo,
  };
  return obj;
};

export const cinemaComplexConfig = (obj) => {
  //cần include he_thong_rap
  obj = {
    ...obj,
    he_thong_rap: cinemaSystemConfig(obj.he_thong_rap),
  };
  delete obj.ma_he_thong_rap;
  return obj;
};

export const cinemaConfig = (obj) => {
  //cần include nguoi_dung, permission
  obj = {
    ...obj,
    cum_rap: cinemaComplexConfig(obj.cum_rap),
  };
  delete obj.ma_cum_rap;
  return obj;
};

export const showTimesConfig = (obj) => {
  obj = {
    ...obj,
    rap_phim: cinemaConfig(obj.rap_phim),
    phim: movieConfig(obj.phim),
  };
  delete obj.ma_rap;
  delete obj.ma_phim;
  return obj;
};

export const seatConfig = (obj) => {
  obj = {
    ...obj,
    rap_phim: cinemaConfig(obj.rap_phim),
  };
  delete obj.ma_rap;
  return obj;
};

export const orderConfig = (obj) => {
  obj = {
    ...obj,
    nguoi_dung: userConfig(obj.nguoi_dung),
    lich_chieu: showTimesConfig(obj.lich_chieu),
    ghe: seatConfig(obj.ghe),
  };
  delete obj.tai_khoan, delete obj.ma_ghe, delete obj.ma_lich_chieu;
  return obj;
};
