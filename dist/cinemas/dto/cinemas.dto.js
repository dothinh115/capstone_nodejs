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
exports.FileUploadDto = exports.CinemaUpdateDto = exports.CinemasCreateDto = exports.CinemasComplexCreateDto = exports.CinemasSystemCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CinemasSystemCreateDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CinemasSystemCreateDto.prototype, "ten_he_thong_rap", void 0);
exports.CinemasSystemCreateDto = CinemasSystemCreateDto;
class CinemasComplexCreateDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CinemasComplexCreateDto.prototype, "ten_cum_rap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CinemasComplexCreateDto.prototype, "dia_chi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CinemasComplexCreateDto.prototype, "ma_he_thong_rap", void 0);
exports.CinemasComplexCreateDto = CinemasComplexCreateDto;
class CinemasCreateDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CinemasCreateDto.prototype, "ten_rap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CinemasCreateDto.prototype, "ma_cum_rap", void 0);
exports.CinemasCreateDto = CinemasCreateDto;
class CinemaUpdateDto extends CinemasCreateDto {
}
exports.CinemaUpdateDto = CinemaUpdateDto;
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
exports.FileUploadDto = FileUploadDto;
//# sourceMappingURL=cinemas.dto.js.map