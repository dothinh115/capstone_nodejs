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
exports.CinemasController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
const cinemas_service_1 = require("./cinemas.service");
const cinemas_dto_1 = require("./dto/cinemas.dto");
let CinemasController = class CinemasController {
    constructor(cinemasService, response) {
        this.cinemasService = cinemasService;
        this.response = response;
    }
    async createCinemaSystem(body, file) {
        if (!file)
            throw new common_1.HttpException(this.response.failRes(variables_1.imgRequiredMessage), 400);
        const data = await this.cinemasService.createCinemaSystem(cinemas_dto_1.CinemasSystemCreateDto.plainToClass(body), file);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.cinemaSystemConfig)(data)), 200);
    }
    async deleteCinemaSystem(ma_he_thong_rap) {
        await this.cinemasService.deleteCinemaSystem(ma_he_thong_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getCinemaSystem() {
        const data = await this.cinemasService.getCinemaSystem();
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async createCinemaComlex(body) {
        const data = await this.cinemasService.createCinemaComlex(cinemas_dto_1.CinemasComplexCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async deleteCinemaComlex(ma_cum_rap) {
        await this.cinemasService.deleteCinemaComlex(ma_cum_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async createCinema(body) {
        const data = await this.cinemasService.createCinema(cinemas_dto_1.CinemasCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getCinemaComlex() {
        const data = await this.cinemasService.getCinemaComplex();
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async deleteCinema(ma_rap) {
        await this.cinemasService.deleteCinema(ma_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getCinemaInfo(ma_rap) {
        const data = await this.cinemasService.getCinemaInfo(ma_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async getCinemasByComplex(ma_cum_rap) {
        const data = await this.cinemasService.getCinemasByComplex(ma_cum_rap);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
    async updateCinema(ma_rap, body) {
        const data = await this.cinemasService.updateCinema(ma_rap, body);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                ten_he_thong_rap: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators),
    (0, common_1.Post)('/createCinemaSystem'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img/cinemas',
            filename(req, file, callback) {
                callback(null, Date.now() + '_' + file.originalname);
            },
        }),
        fileFilter(req, file, callback) {
            (0, function_1.movieImgCheck)(req, file, callback);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "createCinemaSystem", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators),
    (0, common_1.Delete)('/deleteCinemaSystem/:ma_he_thong_rap'),
    __param(0, (0, common_1.Param)('ma_he_thong_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "deleteCinemaSystem", null);
__decorate([
    (0, common_1.Get)('/getCinemaSystem'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "getCinemaSystem", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Post)('/createCinemaComlex'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cinemas_dto_1.CinemasComplexCreateDto]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "createCinemaComlex", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Delete)('/deleteCinemaComlex/:ma_cum_rap'),
    __param(0, (0, common_1.Param)('ma_cum_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "deleteCinemaComlex", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Post)('/createCinema'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cinemas_dto_1.CinemasCreateDto]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "createCinema", null);
__decorate([
    (0, common_1.Get)('/getCinemaComlex'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "getCinemaComlex", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Delete)('/deleteCinema/:ma_rap'),
    __param(0, (0, common_1.Param)('ma_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "deleteCinema", null);
__decorate([
    (0, common_1.Get)('/getCinemaInfo/:ma_rap'),
    __param(0, (0, common_1.Param)('ma_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "getCinemaInfo", null);
__decorate([
    (0, common_1.Get)('/getCinemasByComplex/:ma_cum_rap'),
    __param(0, (0, common_1.Param)('ma_cum_rap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "getCinemasByComplex", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Moderators),
    (0, common_1.Put)('/updateCinema/:ma_rap'),
    __param(0, (0, common_1.Param)('ma_rap')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cinemas_dto_1.CinemaUpdateDto]),
    __metadata("design:returntype", Promise)
], CinemasController.prototype, "updateCinema", null);
CinemasController = __decorate([
    (0, swagger_1.ApiTags)('Cinemas'),
    (0, common_1.Controller)('/cinemas'),
    __metadata("design:paramtypes", [cinemas_service_1.CinemasProvider,
        global_dto_1.Response])
], CinemasController);
exports.CinemasController = CinemasController;
//# sourceMappingURL=cinemas.controller.js.map