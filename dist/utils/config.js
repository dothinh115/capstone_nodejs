"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderConfig = exports.seatConfig = exports.showTimesConfig = exports.cinemaConfig = exports.cinemaComplexConfig = exports.cinemaSystemConfig = exports.movieConfig = exports.userConfig = exports.permissionConfig = void 0;
const variables_1 = require("./variables");
exports.permissionConfig = {
    Banned: 0,
    Members: 1,
    Editors: 2,
    Moderators: 3,
    Administrators: 4,
};
const userConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { loai_nguoi_dung: obj.permission.permission_name });
    delete obj['permission'];
    obj.mat_khau && delete obj.mat_khau;
    return obj;
};
exports.userConfig = userConfig;
const movieConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { nguoi_dang: (0, exports.userConfig)(obj.nguoi_dung), hinh_anh: variables_1.movieImgPath + obj.hinh_anh });
    delete obj['tai_khoan'];
    delete obj['nguoi_dung'];
    return obj;
};
exports.movieConfig = movieConfig;
const cinemaSystemConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { logo: variables_1.cinemaImgPath + obj.logo });
    return obj;
};
exports.cinemaSystemConfig = cinemaSystemConfig;
const cinemaComplexConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { he_thong_rap: (0, exports.cinemaSystemConfig)(obj.he_thong_rap) });
    delete obj.ma_he_thong_rap;
    return obj;
};
exports.cinemaComplexConfig = cinemaComplexConfig;
const cinemaConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { cum_rap: (0, exports.cinemaComplexConfig)(obj.cum_rap) });
    delete obj.ma_cum_rap;
    return obj;
};
exports.cinemaConfig = cinemaConfig;
const showTimesConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { rap_phim: (0, exports.cinemaConfig)(obj.rap_phim), phim: (0, exports.movieConfig)(obj.phim) });
    delete obj.ma_rap;
    delete obj.ma_phim;
    return obj;
};
exports.showTimesConfig = showTimesConfig;
const seatConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { rap_phim: (0, exports.cinemaConfig)(obj.rap_phim) });
    delete obj.ma_rap;
    return obj;
};
exports.seatConfig = seatConfig;
const orderConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { nguoi_dung: (0, exports.userConfig)(obj.nguoi_dung), lich_chieu: (0, exports.showTimesConfig)(obj.lich_chieu), ghe: (0, exports.seatConfig)(obj.ghe) });
    delete obj.tai_khoan, delete obj.ma_ghe, delete obj.ma_lich_chieu;
    return obj;
};
exports.orderConfig = orderConfig;
//# sourceMappingURL=config.js.map