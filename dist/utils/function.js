"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = exports.movieImgCheck = exports.movieConfig = exports.userConfig = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const variables_1 = require("./variables");
const maxSize = 6000000;
const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const userConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { loai_nguoi_dung: obj.permission.permission_name });
    delete obj['permission'];
    return obj;
};
exports.userConfig = userConfig;
const movieConfig = (obj) => {
    obj.nguoi_dung.loai_nguoi_dung = obj.nguoi_dung.permission.permission_name;
    delete obj.nguoi_dung.permission;
    obj = Object.assign(Object.assign({}, obj), { nguoi_dang: obj.nguoi_dung });
    delete obj['tai_khoan'];
    delete obj['nguoi_dung'];
    return obj;
};
exports.movieConfig = movieConfig;
const movieImgCheck = (file) => {
    let errMessage;
    if (!file)
        errMessage = `Phải có hình ảnh!`;
    else {
        const checkFindType = type.find((type) => type === file.mimetype);
        if (!checkFindType)
            errMessage = `Chỉ được upload hình [jpeg|jpg|png|gif]`;
        if (file.size > maxSize)
            errMessage = `Tối đa ${maxSize / 1000000}Mb!`;
    }
    if (errMessage) {
        if (file)
            fs.unlinkSync(file.destination + '/' + file.filename);
        throw new common_1.HttpException(errMessage, 400);
    }
};
exports.movieImgCheck = movieImgCheck;
const extractToken = (token) => {
    if (!token)
        throw new common_1.HttpException(variables_1.invalidTokenMessage, 400);
    token = token.split(' ')[1];
    if (!jwt.verify(token, process.env.SECRET_KEY))
        throw new common_1.HttpException(variables_1.invalidTokenMessage, 400);
    return jwt.decode(token);
};
exports.extractToken = extractToken;
//# sourceMappingURL=function.js.map