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
exports.dataProvider = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let dataProvider = class dataProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createShowTime(body) {
        const data = Object.assign(Object.assign({}, body), { ngay_gio_chieu: new Date(body.ngay_gio_chieu) });
        const checkIfCinemaExist = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +body.ma_rap,
            },
        });
        if (!checkIfCinemaExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        const checkIfMovieExist = await this.model.phim.findFirst({
            where: {
                ma_phim: +body.ma_phim,
            },
        });
        if (!checkIfMovieExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedMovieMessage), 400);
        let result = await this.model.lich_chieu.create({
            data,
            include: {
                rap_phim: {
                    include: {
                        cum_rap: {
                            include: {
                                he_thong_rap: true,
                            },
                        },
                    },
                },
                phim: {
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
                },
            },
        });
        return (0, config_1.showTimesConfig)(result);
    }
};
dataProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], dataProvider);
exports.dataProvider = dataProvider;
//# sourceMappingURL=data.service.js.map