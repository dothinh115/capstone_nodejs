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
const class_transformer_1 = require("class-transformer");
const ownId_guard_1 = require("../guards/ownId.guard");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
const users_dto_1 = require("./dto/users.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userProvider, response) {
        this.userProvider = userProvider;
        this.response = response;
    }
    async getCurrentUserInfo(req) {
        const data = await req.user;
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getUserInfo(tai_khoan) {
        const result = await this.userProvider.getUserInfo(tai_khoan);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, function_1.userConfig)(result)), 200);
    }
    async deleteUser(tai_khoan) {
        await this.userProvider.deleteUserProvider(tai_khoan);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async updateUser(tai_khoan, body) {
        const data = await this.userProvider.updateUser(tai_khoan, (0, class_transformer_1.plainToClass)(users_dto_1.UpdateUserDto, body, {
            excludeExtraneousValues: true,
        }));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, function_1.userConfig)(data)), 200);
    }
};
__decorate([
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
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators),
    (0, common_1.Delete)('/deleteUser/:tai_khoan'),
    __param(0, (0, common_1.Param)('tai_khoan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
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
UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersProvider,
        global_dto_1.Response])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map