"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgSync = exports.selfCheck = exports.movieImgCheck = exports.movieConfig = exports.userConfig = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const fs = require("fs");
const variables_1 = require("./variables");
const model = new client_1.PrismaClient();
const maxSize = 6000000;
const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const userConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { loai_nguoi_dung: obj.permission.permission_name });
    delete obj['permission'];
    delete obj.mat_khau;
    return obj;
};
exports.userConfig = userConfig;
const movieConfig = (obj) => {
    obj = Object.assign(Object.assign({}, obj), { nguoi_dang: (0, exports.userConfig)(obj.nguoi_dung) });
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
const selfCheck = async (user, params) => {
    const currentUser = user.tai_khoan;
    let handlingUser;
    if (params.tai_khoan)
        handlingUser = params.tai_khoan;
    else if (params.ma_phim) {
        const phim = await model.phim.findFirst({
            where: {
                ma_phim: +params.ma_phim,
            },
        });
        if (!phim)
            throw new common_1.HttpException('Không tìm thấy phim này!', 400);
        handlingUser = phim.tai_khoan;
    }
    return {
        currentUser,
        handlingUser,
    };
};
exports.selfCheck = selfCheck;
const imgSync = async () => {
    const movieList = await model.phim.findMany();
    fs.readdir(variables_1.movieImgPath, (err, files) => {
        files.forEach((file) => {
            const find = movieList.find((item) => item.hinh_anh === file);
            if (!find)
                fs.unlinkSync(`${variables_1.movieImgPath + file}`);
        });
    });
};
exports.imgSync = imgSync;
//# sourceMappingURL=function.js.map