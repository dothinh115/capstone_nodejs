"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AdminModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
const global_dto_1 = require("../utils/dto/global.dto");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
let AdminModule = AdminModule_1 = class AdminModule {
};
AdminModule = AdminModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [AdminModule_1, prisma_module_1.PrismaModule],
        controllers: [admin_controller_1.AdminController],
        providers: [jwt_strategy_1.JwtStrategy, global_dto_1.Response, admin_service_1.AdminProvider],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map