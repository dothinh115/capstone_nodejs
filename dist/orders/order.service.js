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
exports.OrderProvider = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let OrderProvider = class OrderProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async createOrder(body, req) {
        req
            ? (body = Object.assign(Object.assign({}, body), { tai_khoan: req.user.tai_khoan }))
            : body;
        const order = await this.model.dat_ve.create({
            data: body,
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
                lich_chieu: {
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
                },
                ghe: {
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
                },
            },
        });
        return (0, config_1.orderConfig)(order);
    }
    async deleteOrder(ma_dat_ve) {
        const order = await this.model.dat_ve.findFirst({
            where: {
                ma_dat_ve: +ma_dat_ve,
            },
        });
        if (!order)
            throw new common_1.HttpException(this.response.failRes(variables_1.orderNotFoundMessage), 400);
        await this.model.dat_ve.delete({
            where: {
                ma_dat_ve: +ma_dat_ve,
            },
        });
    }
};
OrderProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], OrderProvider);
exports.OrderProvider = OrderProvider;
//# sourceMappingURL=order.service.js.map