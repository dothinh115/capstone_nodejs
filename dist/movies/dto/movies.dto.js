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
exports.GetMovieQueryDto = exports.MovieUpdateDto = exports.MovieCreateDto = exports.MovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class MovieDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieDto.prototype, "ten_phim", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieDto.prototype, "trailer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieDto.prototype, "mo_ta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieDto.prototype, "ngay_khoi_chieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MovieDto.prototype, "danh_gia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], MovieDto.prototype, "hot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], MovieDto.prototype, "dang_chieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], MovieDto.prototype, "sap_chieu", void 0);
exports.MovieDto = MovieDto;
class MovieCreateDto extends MovieDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], MovieCreateDto.prototype, "hinh_anh", void 0);
exports.MovieCreateDto = MovieCreateDto;
class MovieUpdateDto extends MovieDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieUpdateDto.prototype, "ten_phim", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieUpdateDto.prototype, "trailer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieUpdateDto.prototype, "mo_ta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], MovieUpdateDto.prototype, "ngay_khoi_chieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], MovieUpdateDto.prototype, "danh_gia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], MovieUpdateDto.prototype, "hot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], MovieUpdateDto.prototype, "dang_chieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'boolean' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], MovieUpdateDto.prototype, "sap_chieu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], MovieUpdateDto.prototype, "hinh_anh", void 0);
exports.MovieUpdateDto = MovieUpdateDto;
class GetMovieQueryDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd' }),
    __metadata("design:type", String)
], GetMovieQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd' }),
    __metadata("design:type", String)
], GetMovieQueryDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], GetMovieQueryDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], GetMovieQueryDto.prototype, "sort", void 0);
exports.GetMovieQueryDto = GetMovieQueryDto;
//# sourceMappingURL=movies.dto.js.map