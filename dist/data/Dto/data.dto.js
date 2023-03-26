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
exports.GetShowTimeQueryDto = exports.SeatUpdateDto = exports.SeatCreateDto = exports.ShowTimeCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ShowTimeCreateDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ShowTimeCreateDto.prototype, "ma_rap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ShowTimeCreateDto.prototype, "ma_phim", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ShowTimeCreateDto.prototype, "ngay_gio_chieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ShowTimeCreateDto.prototype, "gia_ve", void 0);
exports.ShowTimeCreateDto = ShowTimeCreateDto;
class SeatCreateDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { excludeExtraneousValues: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SeatCreateDto.prototype, "ten_ghe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SeatCreateDto.prototype, "ma_rap", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SeatCreateDto.prototype, "loai_ghe", void 0);
exports.SeatCreateDto = SeatCreateDto;
class SeatUpdateDto extends SeatCreateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], SeatUpdateDto.prototype, "ma_rap", void 0);
exports.SeatUpdateDto = SeatUpdateDto;
class GetShowTimeQueryDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd hh:mm:ss' }),
    __metadata("design:type", String)
], GetShowTimeQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string', example: 'yyyy-mm-dd hh:mm:ss' }),
    __metadata("design:type", String)
], GetShowTimeQueryDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], GetShowTimeQueryDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], GetShowTimeQueryDto.prototype, "sort", void 0);
exports.GetShowTimeQueryDto = GetShowTimeQueryDto;
//# sourceMappingURL=data.dto.js.map