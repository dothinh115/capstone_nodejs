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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemasProvider = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const config_1 = require("../utils/config");
let CinemasProvider = class CinemasProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createCinemaSystem(data, file) {
        const newData = Object.assign(Object.assign({}, data), { logo: file.filename });
        return await this.model.he_thong_rap.create({ data: newData });
    }
    async deleteCinemaSystem(ma_he_thong_rap) {
        const data = await this.model.he_thong_rap.findFirst({
            where: {
                ma_he_thong_rap: +ma_he_thong_rap,
            },
        });
        if (!data)
            throw new common_1.HttpException(this.response.failRes('không tìm ra cụm rạp này'), 400);
        await this.model.he_thong_rap.delete({
            where: {
                ma_he_thong_rap: +ma_he_thong_rap,
            },
        });
        fs.unlinkSync(variables_1.cinemaImgPath + data.logo);
    }
    async getCinemaSystem() {
        const data = await this.model.he_thong_rap.findMany();
        for (let key in data) {
            data[key] = (0, config_1.cinemaSystemConfig)(data[key]);
        }
        return data;
    }
    async createCinemaComlex(data) {
        const checkIfExit = await this.model.he_thong_rap.findFirst({
            where: {
                ma_he_thong_rap: +data.ma_he_thong_rap,
            },
        });
        if (!checkIfExit)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaSystemNotFoundMessage), 400);
        return await this.model.cum_rap.create({ data });
    }
    async deleteCinemaComlex(ma_cum_rap) {
        const data = await this.model.cum_rap.findFirst({
            where: {
                ma_cum_rap: +ma_cum_rap,
            },
        });
        if (!data)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaComplexNotFoundMessage), 400);
        return await this.model.cum_rap.delete({
            where: {
                ma_cum_rap: +ma_cum_rap,
            },
        });
    }
    async createCinema(data) {
        const checkIfExit = await this.model.cum_rap.findFirst({
            where: {
                ma_cum_rap: +data.ma_cum_rap,
            },
        });
        if (!checkIfExit)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaComplexNotFoundMessage), 400);
        return await this.model.rap_phim.create({ data });
    }
    async getCinemaComplex() {
        const data = await this.model.cum_rap.findMany({
            include: {
                he_thong_rap: true,
            },
        });
        for (let key in data) {
            data[key] = (0, config_1.cinemaComplexConfig)(data[key]);
        }
        return data;
    }
    async deleteCinema(ma_rap) {
        const checkIfExit = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +ma_rap,
            },
        });
        if (!checkIfExit)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        return await this.model.rap_phim.delete({
            where: {
                ma_rap: +ma_rap,
            },
        });
    }
    async getCinemaInfo(ma_rap) {
        const checkIfExit = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +ma_rap,
            },
            include: {
                cum_rap: {
                    include: {
                        he_thong_rap: true,
                    },
                },
            },
        });
        if (!checkIfExit)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        return (0, config_1.cinemaConfig)(checkIfExit);
    }
    async getCinemasByComplex(ma_cum_rap) {
        const checkIfExit = await this.model.cum_rap.findFirst({
            where: {
                ma_cum_rap: +ma_cum_rap,
            },
        });
        if (!checkIfExit)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaComplexNotFoundMessage), 400);
        const data = await this.model.rap_phim.findMany({
            where: {
                ma_cum_rap: +ma_cum_rap,
            },
            include: {
                cum_rap: {
                    include: {
                        he_thong_rap: true,
                    },
                },
            },
        });
        for (let key in data) {
            data[key] = (0, config_1.cinemaConfig)(data[key]);
        }
        return data;
    }
    async updateCinema(ma_rap, data) {
        const checkIfCinemaExist = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +ma_rap,
            },
        });
        if (!checkIfCinemaExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        const checkIfComplexExist = await this.model.cum_rap.findFirst({
            where: {
                ma_cum_rap: +data.ma_cum_rap,
            },
        });
        if (!checkIfComplexExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaComplexNotFoundMessage), 400);
        const result = await this.model.rap_phim.update({
            data,
            where: {
                ma_rap: +ma_rap,
            },
            include: {
                cum_rap: {
                    include: {
                        he_thong_rap: true,
                    },
                },
            },
        });
        return (0, config_1.cinemaConfig)(result);
    }
};
CinemasProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], CinemasProvider);
exports.CinemasProvider = CinemasProvider;
//# sourceMappingURL=cinemas.service.js.map