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
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
const fs = require("fs");
let MoviesProvider = class MoviesProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createNewMovie(file, body, tai_khoan) {
        (0, function_1.movieImgCheck)(file);
        const { danh_gia, dang_chieu, sap_chieu, hot } = body, others = __rest(body, ["danh_gia", "dang_chieu", "sap_chieu", "hot"]);
        const data = Object.assign(Object.assign({}, others), { ngay_khoi_chieu: new Date(), danh_gia: Number(danh_gia), hot: Number(hot) === 1 ? true : false, dang_chieu: Number(dang_chieu) === 1 ? true : false, sap_chieu: Number(sap_chieu) === 1 ? true : false, hinh_anh: file.filename, tai_khoan });
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
};
MoviesProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], MoviesProvider);
exports.MoviesProvider = MoviesProvider;
//# sourceMappingURL=movies.service.js.map