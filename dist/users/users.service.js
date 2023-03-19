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
exports.UsersProvider = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let UsersProvider = class UsersProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async deleteUserProvider(tai_khoan) {
        const userInfo = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: Number(tai_khoan),
            },
        });
        if (!userInfo)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        await this.model.nguoi_dung.delete({
            where: {
                tai_khoan: Number(tai_khoan),
            },
        });
    }
    async getUserInfo(tai_khoan) {
        const data = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: Number(tai_khoan),
            },
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        return data;
    }
    async updateUser(tai_khoan, body) {
        const user = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: +tai_khoan,
            },
        });
        if (!user)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        const data = Object.assign({}, body);
        return await this.model.nguoi_dung.update({
            data,
            where: {
                tai_khoan: +tai_khoan,
            },
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
    }
};
UsersProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], UsersProvider);
exports.UsersProvider = UsersProvider;
//# sourceMappingURL=users.service.js.map