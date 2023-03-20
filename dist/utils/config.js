"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieConfig = exports.userConfig = exports.maxSize = exports.permissionConfig = void 0;
const variables_1 = require("./variables");
exports.permissionConfig = {
    Banned: 0,
    Members: 1,
    Editors: 2,
    Moderators: 3,
    Administrators: 4,
};
exports.maxSize = 6000000;
const userConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { loai_nguoi_dung: obj.permission.permission_name });
    delete obj['permission'];
    delete obj.mat_khau;
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
//# sourceMappingURL=config.js.map