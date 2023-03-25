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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
let RoleGuard = class RoleGuard {
    constructor(reflector, response) {
        this.reflector = reflector;
        this.response = response;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles)
            return true;
        const req = context.switchToHttp().getRequest();
        if (req.privateAllowed)
            return true;
        for (let value of roles) {
            if (req.user.loai_nguoi_dung === value) {
                return true;
            }
        }
        throw new common_1.UnauthorizedException(variables_1.notAllowedMessage);
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, global_dto_1.Response])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=roles.guard.js.map