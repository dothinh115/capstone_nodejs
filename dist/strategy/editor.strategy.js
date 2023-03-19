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
exports.EditorStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let EditorStrategy = class EditorStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'editor') {
    constructor(configService, model, response) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET_KEY'),
        });
        this.model = model;
        this.response = response;
    }
    async validate(payload) {
        const userInfo = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: payload.tai_khoan,
            },
        });
        if (userInfo.loai_nguoi_dung < 2)
            throw new common_1.HttpException(this.response.failRes(variables_1.notAllowedMessage), 400);
        return payload;
    }
};
EditorStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        global_dto_1.Response])
], EditorStrategy);
exports.EditorStrategy = EditorStrategy;
//# sourceMappingURL=editor.strategy.js.map