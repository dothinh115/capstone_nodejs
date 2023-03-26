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
exports.UserLoginResponseDto = exports.UserLoginDto = exports.UserDto = exports.UserBaseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const variables_1 = require("../../utils/variables");
class UserBaseDto {
    static plainToClass(obj) {
        return (0, class_transformer_1.plainToClass)(this, obj, { exposeUnsetFields: true });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Điền đúng định dạng email!' }),
    __metadata("design:type", String)
], UserBaseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserBaseDto.prototype, "ho_ten", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserBaseDto.prototype, "mat_khau", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(variables_1.so_dt_pattern, { message: variables_1.phoneNumberRequired }),
    __metadata("design:type", String)
], UserBaseDto.prototype, "so_dt", void 0);
exports.UserBaseDto = UserBaseDto;
class UserDto extends UserBaseDto {
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserDto.prototype, "mat_khau", void 0);
exports.UserDto = UserDto;
class UserLoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "mat_khau", void 0);
exports.UserLoginDto = UserLoginDto;
class UserLoginResponseDto extends UserDto {
}
exports.UserLoginResponseDto = UserLoginResponseDto;
//# sourceMappingURL=auth.dto.js.map