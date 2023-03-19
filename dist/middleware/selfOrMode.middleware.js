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
exports.SelfOrModeMidlleWare = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
let SelfOrModeMidlleWare = class SelfOrModeMidlleWare {
    constructor(model, response) {
        this.model = model;
        this.response = response;
    }
    async use(req, res, next) {
        const { tai_khoan } = req.params;
        const { authorization } = req.headers;
        const user = (0, function_1.extractToken)(authorization);
        const modeCheck = await this.model.nguoi_dung.findFirst({
            where: {
                tai_khoan: user['tai_khoan'],
            },
        });
        if (modeCheck.loai_nguoi_dung >= 3) {
            next();
            return;
        }
        if (user['tai_khoan'] === +tai_khoan) {
            next();
            return;
        }
        throw new common_1.HttpException(this.response.failRes(variables_1.notAllowedMessage), 400);
    }
};
SelfOrModeMidlleWare = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, global_dto_1.Response])
], SelfOrModeMidlleWare);
exports.SelfOrModeMidlleWare = SelfOrModeMidlleWare;
//# sourceMappingURL=selfOrMode.middleware.js.map