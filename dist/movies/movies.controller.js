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
const multer_1 = require("multer");
const editor_guard_1 = require("../guards/editor.guard");
const strategy_1 = require("../strategy");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(moviesProvider, response) {
        this.moviesProvider = moviesProvider;
        this.response = response;
    }
    async upload(file, body, req) {
        let data = await this.moviesProvider.createNewMovie(file, body, +req.user['tai_khoan']);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, function_1.movieConfig)(data)), 200);
    }
    async deleteMovie(ma_phim) {
        await this.moviesProvider.deleteMovie(ma_phim);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
    async getMovieInfo(ma_phim) {
        const data = await this.moviesProvider.getMovieInfo(ma_phim);
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, (0, function_1.movieConfig)(data)), 200);
    }
};
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, editor_guard_1.EditorRole),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('hinh_anh', {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + '/public/img',
            filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "upload", null);
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, editor_guard_1.EditorRole),
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
MoviesController = __decorate([
    (0, common_1.Controller)('/movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesProvider,
        global_dto_1.Response])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map