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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ownId_guard_1 = require("../guards/ownId.guard");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const users_dto_1 = require("./dto/users.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userProvider, response) {
        this.userProvider = userProvider;
        this.response = response;
    }
    async getCurrentUserInfo(req) {
        const data = await (0, config_1.userConfig)(req.user);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getUserInfo(tai_khoan) {
        const result = await this.userProvider.getUserInfo(tai_khoan);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.userConfig)(result)), 200);
    }
    async deleteUser(tai_khoan, req) {
        await this.userProvider.deleteUserProvider(tai_khoan, req.user);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async updateUser(tai_khoan, body) {
        const data = await this.userProvider.updateUser(tai_khoan, users_dto_1.UpdateUserDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.userConfig)(data)), 200);
    }
    async banUser(tai_khoan, req) {
        const data = await this.userProvider.banUser(tai_khoan, req);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async unBanUser(tai_khoan) {
        const data = await this.userProvider.unBanUser(tai_khoan);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async setPermission(body, req) {
        const data = await this.userProvider.setPermission(users_dto_1.SetPermissionDto.plainToClass(body), req);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getAllUser() {
        const data = await this.userProvider.getAllUser();
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getUserPageDivision(page, limit) {
        const data = await this.userProvider.getUserPageDivision(page, limit);
        if (data.length === 0)
            throw new common_1.HttpException(this.response.successRes('Không tìm thấy user ở trang này'), 200);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getUserByNamePageDivision(page, limit, query) {
        const data = await this.userProvider.getUserByNamePageDivision(page, limit, query);
        if (data.length === 0)
            throw new common_1.HttpException(this.response.successRes('Không tìm thấy user ở trang này'), 200);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getUserByName(keyword) {
        const data = await this.userProvider.getUserByName(keyword);
        if (data.length === 0)
            throw new common_1.HttpException(this.response.successRes('Không tìm thấy user ở trang này'), 200);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization),
    (0, common_1.Get)('/getCurrentUserInfo'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUserInfo", null);
__decorate([
    (0, common_1.Get)('/getUserInfo/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators),
    (0, common_1.Delete)('/deleteUser/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, ownId_guard_1.OwnID, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('/update/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Put)('/banUser/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Put)('/unBanUser/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unBanUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Put)('/setPermission'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SetPermissionDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setPermission", null);
__decorate([
    (0, common_1.Get)('/getAllUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('/getUserPageDivision'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserPageDivision", null);
__decorate([
    (0, common_1.Get)('/getUserByNamePageDivision'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'query', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByNamePageDivision", null);
__decorate([
    (0, common_1.Get)('/getUserByName'),
    (0, swagger_1.ApiQuery)({ name: 'keyword', required: false }),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByName", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersProvider,
        global_dto_1.Response])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map