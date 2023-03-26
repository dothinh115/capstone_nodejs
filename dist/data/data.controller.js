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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const data_service_1 = require("./data.service");
const data_dto_1 = require("./Dto/data.dto");
let DataController = class DataController {
    constructor(response, dataService) {
        this.response = response;
        this.dataService = dataService;
    }
    async createShowTime(body) {
        const data = await this.dataService.createShowTime(data_dto_1.ShowTimeCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async deleteShowTime(ma_lich_chieu) {
        await this.dataService.deleteShowTime(ma_lich_chieu);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getShowTime(query) {
        const { from, to, number, sort } = query;
        if (from || to) {
            if (!from || !to) {
                throw new common_1.HttpException(this.response.failRes('phải có đủ from và to'), 400);
            }
            const data = await this.dataService.getShowTimeFromDateToDate(from, to, number ? number : null, sort ? sort : null);
            throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
        }
        else if (number) {
            const data = await this.dataService.getShowTimeByQuantity(number, sort ? sort : null);
            throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
        }
        throw new common_1.HttpException(this.response.successRes('Hướng dẫn sử dụng (query)', {
            from: 'Từ ngày',
            to: 'Đến ngày',
            number: 'Giới hạn số lượng trả về (có hoặc không)',
            sort: 'asc hoặc desc (có hoặc không)',
        }), 200);
    }
    async createSeat(body) {
        const data = await this.dataService.createSeat(data_dto_1.SeatCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async deleteSeat(ma_ghe) {
        await this.dataService.deleteSeat(ma_ghe);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getSeatByCinema(ma_rap) {
        const result = await this.dataService.getSeatByCinema(ma_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, result), 200);
    }
    async updateSeat(ma_ghe, body) {
        const result = await this.dataService.updateSeat(ma_ghe, data_dto_1.SeatUpdateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, result), 200);
    }
    async getShowTimeByMovie(ma_phim) {
        const data = await this.dataService.getShowTimeByMovie(ma_phim);
        if (data.length === 0)
            throw new common_1.HttpException(this.response.successRes('phim này chưa có lịch chiếu'), 200);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators),
    (0, common_1.Post)('/createShowTime'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_dto_1.ShowTimeCreateDto]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "createShowTime", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators, config_1.permissionConfig.Editors),
    (0, common_1.Delete)('/deleteShowTime/:ma_lich_chieu'),
    __param(0, (0, common_1.Param)('ma_lich_chieu')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "deleteShowTime", null);
__decorate([
    (0, common_1.Get)('/getShowTime'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_dto_1.GetShowTimeQueryDto]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getShowTime", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators, config_1.permissionConfig.Editors),
    (0, common_1.Post)('/createSeat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_dto_1.SeatCreateDto]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "createSeat", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators, config_1.permissionConfig.Editors),
    (0, common_1.Delete)('/deleteSeat/:ma_ghe'),
    __param(0, (0, common_1.Param)('ma_ghe')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "deleteSeat", null);
__decorate([
    (0, common_1.Get)('/getSeatByCinema/:ma_rap'),
    __param(0, (0, common_1.Param)('ma_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getSeatByCinema", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators, config_1.permissionConfig.Editors),
    (0, common_1.Put)('/updateSeat/:ma_ghe'),
    __param(0, (0, common_1.Param)('ma_ghe')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, data_dto_1.SeatUpdateDto]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "updateSeat", null);
__decorate([
    (0, common_1.Get)('/getShowTimeByMovie/:ma_phim'),
    __param(0, (0, common_1.Param)('ma_phim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getShowTimeByMovie", null);
DataController = __decorate([
    (0, swagger_1.ApiTags)('Data'),
    (0, common_1.Controller)('/data'),
    __metadata("design:paramtypes", [global_dto_1.Response, data_service_1.DataProvider])
], DataController);
exports.DataController = DataController;
//# sourceMappingURL=data.controller.js.map