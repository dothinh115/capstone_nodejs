"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesProvider = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const fs = require("fs");
const config_1 = require("../utils/config");
const function_1 = require("../utils/function");
let MoviesProvider = class MoviesProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createNewMovie(req, file, body, tai_khoan) {
        const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu } = body, others = __rest(body, ["danh_gia", "dang_chieu", "sap_chieu", "hot", "ngay_khoi_chieu"]);
        const data = Object.assign(Object.assign({}, others), { ngay_khoi_chieu: (0, function_1.createDateAsUTC)(new Date(ngay_khoi_chieu)), danh_gia: +danh_gia, hot: +hot === 1 ? true : false, dang_chieu: +dang_chieu === 1 ? true : false, sap_chieu: +sap_chieu === 1 ? true : false, hinh_anh: file.filename, tai_khoan });
        const newMovie = await this.model.phim.create({
            data,
        });
        return await this.model.phim.findFirst({
            where: {
                ma_phim: newMovie.ma_phim,
            },
            include: {
                nguoi_dung: {
                    include: {
                        permission: {
                            select: {
                                permission_name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async deleteMovie(ma_phim) {
        const movie = await this.model.phim.findFirst({
            where: {
                ma_phim: Number(ma_phim),
            },
        });
        if (!movie)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedMovieMessage), 400);
        await this.model.phim.delete({
            where: {
                ma_phim: Number(ma_phim),
            },
        });
        fs.unlinkSync(variables_1.movieImgPath + movie.hinh_anh);
    }
    async getMovieInfo(ma_phim) {
        const result = await this.model.phim.findFirst({
            where: {
                ma_phim: +ma_phim,
            },
            include: {
                nguoi_dung: {
                    include: {
                        permission: {
                            select: {
                                permission_name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!result)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedMovieMessage), 400);
        return result;
    }
    async updateMovie(file, body, ma_phim) {
        const phim = await this.model.phim.findFirst({
            where: {
                ma_phim: +ma_phim,
            },
        });
        if (!phim)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedMovieMessage), 400);
        const { danh_gia, dang_chieu, sap_chieu, hot, ngay_khoi_chieu } = body, others = __rest(body, ["danh_gia", "dang_chieu", "sap_chieu", "hot", "ngay_khoi_chieu"]);
        const data = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, others), (ngay_khoi_chieu && {
            ngay_khoi_chieu: (0, function_1.createDateAsUTC)(new Date(ngay_khoi_chieu)),
        })), (danh_gia && { danh_gia: +danh_gia })), (hot && { hot: +hot === 1 ? true : false })), (dang_chieu && { dang_chieu: +dang_chieu === 1 ? true : false })), (sap_chieu && { sap_chieu: +sap_chieu === 1 ? true : false })), (file && { hinh_anh: file.filename }));
        if (file)
            fs.unlinkSync(variables_1.movieImgPath + phim.hinh_anh);
        return await this.model.phim.update({
            data,
            where: {
                ma_phim: +ma_phim,
            },
            include: {
                nguoi_dung: {
                    include: {
                        permission: {
                            select: {
                                permission_name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getMovieFromDateToDate(from, to, number, sort) {
        if (number && +number < 1)
            throw new common_1.HttpException('number không thể bé hơn 1', 400);
        const data = await this.model.phim.findMany(Object.assign(Object.assign({ where: {
                ngay_khoi_chieu: {
                    lte: (0, function_1.createDateAsUTC)(new Date(to)),
                    gte: (0, function_1.createDateAsUTC)(new Date(from)),
                },
            }, include: {
                nguoi_dung: {
                    include: {
                        permission: {
                            select: {
                                permission_name: true,
                            },
                        },
                    },
                },
            } }, (number && { take: +number })), (sort && {
            orderBy: {
                ngay_khoi_chieu: sort,
            },
        })));
        for (let key in data) {
            data[key] = (0, config_1.movieConfig)(data[key]);
        }
        return data;
    }
    async getMovieByQuantity(number, sort) {
        if (+number < 1)
            throw new common_1.HttpException('number không thể bé hơn 1', 400);
        const dataQuantity = await this.model.phim.findMany(Object.assign({ take: +number, include: {
                nguoi_dung: {
                    include: {
                        permission: {
                            select: { permission_name: true },
                        },
                    },
                },
            } }, (sort && {
            orderBy: {
                ngay_khoi_chieu: sort,
            },
        })));
        for (const key in dataQuantity) {
            dataQuantity[key] = (0, config_1.movieConfig)(dataQuantity[key]);
        }
        return dataQuantity;
    }
};
MoviesProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], MoviesProvider);
exports.MoviesProvider = MoviesProvider;
//# sourceMappingURL=movies.service.js.map