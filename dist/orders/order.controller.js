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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService, response) {
        this.orderService = orderService;
        this.response = response;
    }
    async createOrder(body, req) {
        const result = await this.orderService.createOrder(order_dto_1.OrderCreateDto.plainToClass(body), req);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, result), 200);
    }
    async adminCreate(body) {
        const result = await this.orderService.createOrder(order_dto_1.OrderCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, result), 200);
    }
    async deleteOrder(ma_dat_ve) {
        await this.orderService.deleteOrder(ma_dat_ve);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
};
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderCreateDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.Post)('/adminCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderCreateDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "adminCreate", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.Delete)('/deleteOrder/:ma_dat_ve'),
    __param(0, (0, common_1.Param)('ma_dat_ve')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('/order'),
    __metadata("design:paramtypes", [order_service_1.OrderProvider,
        global_dto_1.Response])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map