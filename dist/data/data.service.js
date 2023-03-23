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
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
let dataProvider = class dataProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createShowTime(body) {
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
        const date = new Date(body.ngay_gio_chieu);
        const ngay_gio_chieu = (0, function_1.createDateAsUTC)(date);
        const checkShowTime = await this.model.lich_chieu.findFirst({
            where: {
                AND: [
                    { ma_rap: +body.ma_rap },
                    { ma_phim: +body.ma_phim },
                    {
                        ngay_gio_chieu,
                    },
                ],
            },
        });
        if (checkShowTime)
            throw new common_1.HttpException(this.response.failRes(variables_1.alreadyExistedshowTimeMessage), 400);
        const data = Object.assign(Object.assign({}, body), { ngay_gio_chieu });
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
    async deleteShowTime(ma_lich_chieu) {
        const checkIfShowTimeExist = await this.model.lich_chieu.findFirst({
            where: {
                ma_lich_chieu: +ma_lich_chieu,
            },
        });
        if (!checkIfShowTimeExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.showTimeNotFoundMessage), 400);
        await this.model.lich_chieu.delete({
            where: {
                ma_lich_chieu: +ma_lich_chieu,
            },
        });
    }
    async getShowTimeFromDateToDate(from, to, number, sort) {
        if (+number === 0)
            throw new common_1.HttpException('number không thể là 0', 400);
        const result = await this.model.lich_chieu.findMany(Object.assign(Object.assign({ where: {
                ngay_gio_chieu: {
                    lte: (0, function_1.createDateAsUTC)(new Date(to)),
                    gte: (0, function_1.createDateAsUTC)(new Date(from)),
                },
            }, include: {
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
            } }, (number && { take: +number })), (sort && {
            orderBy: {
                ngay_gio_chieu: sort,
            },
        })));
        for (let key in result) {
            result[key] = (0, config_1.showTimesConfig)(result[key]);
        }
        return result;
    }
    async getShowTimeByQuantity(number, sort) {
        if (+number === 0)
            throw new common_1.HttpException('number không thể là 0', 400);
        const result = await this.model.lich_chieu.findMany(Object.assign(Object.assign({ take: +number }, (sort && {
            orderBy: {
                ngay_gio_chieu: sort,
            },
        })), { include: {
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
            } }));
        for (let key in result) {
            result[key] = (0, config_1.showTimesConfig)(result[key]);
        }
        return result;
    }
    async createSeat(data) {
        const cinema = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +data.ma_rap,
            },
        });
        if (!cinema)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        const result = await this.model.ghe.create({
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
            },
        });
        return (0, config_1.seatConfig)(result);
    }
    async deleteSeat(ma_ghe) {
        const seat = await this.model.ghe.findFirst({
            where: {
                ma_ghe: +ma_ghe,
            },
        });
        if (!seat)
            throw new common_1.HttpException(this.response.failRes(variables_1.seatNotFoundMessage), 400);
        await this.model.ghe.delete({
            where: {
                ma_ghe: +ma_ghe,
            },
        });
    }
    async getSeatByCinema(ma_rap) {
        const seat = await this.model.rap_phim.findFirst({
            where: {
                ma_rap: +ma_rap,
            },
        });
        if (!seat)
            throw new common_1.HttpException(this.response.failRes(variables_1.cinemaNotFoundMessage), 400);
        const result = await this.model.ghe.findMany({
            where: {
                ma_rap: +ma_rap,
            },
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
            },
        });
        for (let key in result) {
            result[key] = (0, config_1.seatConfig)(result[key]);
        }
        return result;
    }
    async updateSeat(ma_ghe, body) {
        const seat = await this.model.ghe.findFirst({
            where: {
                ma_ghe: +ma_ghe,
            },
        });
        if (!seat)
            throw new common_1.HttpException(this.response.failRes(variables_1.seatNotFoundMessage), 400);
        const result = await this.model.ghe.update({
            data: body,
            where: {
                ma_ghe: +ma_ghe,
            },
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
            },
        });
        return (0, config_1.seatConfig)(result);
    }
    async getShowTimeByMovie(ma_phim) {
        const checkIfMovieExist = await this.model.phim.findFirst({
            where: {
                ma_phim: +ma_phim,
            },
        });
        if (!checkIfMovieExist)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedMovieMessage), 200);
        const result = await this.model.lich_chieu.findMany({
            where: {
                ma_phim: +ma_phim,
            },
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
            },
        });
        return result;
    }
};
dataProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], dataProvider);
exports.dataProvider = dataProvider;
//# sourceMappingURL=data.service.js.map