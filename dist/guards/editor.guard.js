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
exports.EditorRole = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
let EditorRole = class EditorRole {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { params } = context.getArgs()[0];
        if ((req.user && params.tai_khoan) || params.ma_phim) {
            const { currentUser, handlingUser } = await (0, function_1.selfCheck)(req.user, params);
            const userInfo = await this.model.nguoi_dung.findFirst({
                where: {
                    tai_khoan: currentUser,
                },
            });
            if (currentUser === handlingUser)
                return true;
            else if (userInfo.loai_nguoi_dung >= 2)
                return true;
            else
                throw new common_1.HttpException(this.response.failRes(variables_1.notAllowedMessage), 400);
        }
        const userInfo = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: +req.user.tai_khoan,
            },
        });
        if (userInfo.loai_nguoi_dung >= 2)
            return true;
        else
            throw new common_1.HttpException(this.response.failRes(variables_1.notAllowedMessage), 400);
    }
};
EditorRole = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], EditorRole);
exports.EditorRole = EditorRole;
//# sourceMappingURL=editor.guard.js.map