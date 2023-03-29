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
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let UsersProvider = class UsersProvider {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async deleteUserProvider(tai_khoan, user) {
        const userInfo = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: Number(tai_khoan),
            },
        });
        if (!userInfo)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        if (userInfo.tai_khoan === user.tai_khoan)
            throw new common_1.HttpException(this.response.failRes(variables_1.selfDeteleNotAllowed), 400);
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
    async banUser(tai_khoan, req) {
        const user = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: +tai_khoan,
            },
        });
        if (!user)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        if (req.user.tai_khoan === +tai_khoan)
            throw new common_1.HttpException(this.response.failRes(variables_1.selfBanNotAllowed), 400);
        if (req.user.loai_nguoi_dung < user.loai_nguoi_dung)
            throw new common_1.HttpException(this.response.failRes(variables_1.notEnoughRightsBanMessage), 400);
        if (user.loai_nguoi_dung === config_1.permissionConfig.Banned)
            throw new common_1.HttpException(this.response.failRes(variables_1.alreadyBannedMessage), 400);
        const data = await this.model.nguoi_dung.update({
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
            data: {
                loai_nguoi_dung: 0,
            },
        });
        return (0, config_1.userConfig)(data);
    }
    async unBanUser(tai_khoan) {
        const user = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: +tai_khoan,
            },
        });
        if (!user)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        if (user.loai_nguoi_dung !== config_1.permissionConfig.Banned)
            throw new common_1.HttpException(this.response.failRes(variables_1.notBannedMessage), 200);
        const data = await this.model.nguoi_dung.update({
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
            data: {
                loai_nguoi_dung: 1,
            },
        });
        return (0, config_1.userConfig)(data);
    }
    async setPermission(data, req) {
        const user = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: +data.tai_khoan,
            },
        });
        if (!user)
            throw new common_1.HttpException(this.response.failRes(variables_1.notExistedUserMessage), 400);
        if (req.user.tai_khoan === data.tai_khoan)
            throw new common_1.HttpException(this.response.failRes(variables_1.selfSetPermissionNotAllowedMessage), 400);
        if (req.user.loai_nguoi_dung < user.loai_nguoi_dung)
            throw new common_1.HttpException(this.response.failRes(variables_1.notEnoughRightsPermissionMessage), 400);
        if (data.loai_nguoi_dung > req.user.loai_nguoi_dung)
            throw new common_1.HttpException(this.response.failRes(variables_1.higherPermissionSetNotAllowedMessage), 400);
        const result = await this.model.nguoi_dung.update({
            data: {
                loai_nguoi_dung: data.loai_nguoi_dung,
            },
            where: {
                tai_khoan: data.tai_khoan,
            },
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        return (0, config_1.userConfig)(result);
    }
    async getAllUser() {
        const data = await this.model.nguoi_dung.findMany({
            include: {
                permission: true,
            },
        });
        for (const key in data) {
            data[key] = (0, config_1.userConfig)(data[key]);
        }
        return data;
    }
    async getUserPageDivision(page = '1', limit = '10') {
        const skip = (+page - 1) * +limit;
        let result = await this.model.nguoi_dung.findMany({
            skip,
            take: +limit,
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        for (let key in result) {
            result[key] = (0, config_1.userConfig)(result[key]);
        }
        return result;
    }
    async getUserByNamePageDivision(page = '1', limit = '10', query = '') {
        const skip = (+page - 1) * +limit;
        let result = await this.model.nguoi_dung.findMany({
            where: {
                OR: [{ ho_ten: { contains: query } }, { email: { contains: query } }],
            },
            skip,
            take: +limit,
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        for (let key in result) {
            result[key] = (0, config_1.userConfig)(result[key]);
        }
        return result;
    }
    async getUserByName(keyword) {
        let result = await this.model.nguoi_dung.findMany({
            where: {
                ho_ten: { contains: keyword },
            },
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        console.log(result);
        for (let key in result) {
            result[key] = (0, config_1.userConfig)(result[key]);
        }
        return result;
    }
};
UsersProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], UsersProvider);
exports.UsersProvider = UsersProvider;
//# sourceMappingURL=users.service.js.map