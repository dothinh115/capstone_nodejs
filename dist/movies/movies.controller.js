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
exports.MoviesController = void 0;
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
const movies_dto_1 = require("./dto/movies.dto");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(moviesProvider, response) {
        this.moviesProvider = moviesProvider;
        this.response = response;
    }
    async createMovie(file, body, req) {
        if (!file)
            throw new common_1.HttpException(this.response.failRes(variables_1.imgRequiredMessage), 400);
        if (req.imgValidationErrorMessage) {
            throw new common_1.HttpException(this.response.failRes(req.imgValidationErrorMessage), 400);
        }
        let data = await this.moviesProvider.createNewMovie(req, file, movies_dto_1.MovieCreateDto.plainToClass(body), +req.user['tai_khoan']);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.movieConfig)(data)), 200);
    }
    async deleteMovie(ma_phim) {
        await this.moviesProvider.deleteMovie(ma_phim);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getMovieInfo(ma_phim) {
        const data = await this.moviesProvider.getMovieInfo(ma_phim);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.movieConfig)(data)), 200);
    }
    async getMovie(from, to, number, sort) {
        if (from || to) {
            if (!from || !to) {
                throw new common_1.HttpException(this.response.failRes('Phải đủ cả from và to!'), 400);
            }
            const data = await this.moviesProvider.getMovieFromDateToDate(from, to, number ? number : null, sort ? sort : null);
            if (data.length === 0)
                throw new common_1.HttpException(this.response.successRes(`Không có phim nào được khởi chiếu từ ${from} đến ${to}`), 200);
            throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
        }
        else if (number) {
            const data = await this.moviesProvider.getMovieByQuantity(number, sort ? sort : null);
            throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
        }
        throw new common_1.HttpException(this.response.successRes('Hướng dẫn sử dụng (query)', {
            from: 'Từ ngày',
            to: 'Đến ngày',
            number: 'Giới hạn số lượng trả về (có hoặc không)',
            sort: 'asc hoặc desc (có hoặc không)',
        }), 200);
    }
    async updateMovie(file, body, ma_phim, req) {
        if (req.imgValidationErrorMessage) {
            throw new common_1.HttpException(this.response.failRes(req.imgValidationErrorMessage), 400);
        }
        let data = await this.moviesProvider.updateMovie(req, file, movies_dto_1.MovieUpdateDto.plainToClass(body), ma_phim);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, config_1.movieConfig)(data)), 200);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('hinh_anh', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
        }),
        fileFilter: function (req, file, callback) {
            (0, function_1.movieImgCheck)(req, file, callback);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createMovie", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.Delete)('/deleteMovie/:ma_phim'),
    __param(0, (0, common_1.Param)('ma_phim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Get)('/getMovieInfo/:ma_phim'),
    __param(0, (0, common_1.Param)('ma_phim')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieInfo", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'from',
        required: false,
        type: 'string',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'to',
        required: false,
        type: 'string',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'number',
        required: false,
        type: 'string',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        type: 'string',
    }),
    (0, common_1.Get)('/getMovie'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, common_1.Query)('number')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovie", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators, config_1.permissionConfig.Administrators),
    (0, common_1.Put)('/updateMovie/:ma_phim'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('hinh_anh', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
        }),
        fileFilter: function (req, file, callback) {
            (0, function_1.movieImgCheck)(req, file, callback);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('ma_phim')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "updateMovie", null);
MoviesController = __decorate([
    (0, swagger_1.ApiTags)('Movies'),
    (0, common_1.Controller)('/movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesProvider,
        global_dto_1.Response])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map