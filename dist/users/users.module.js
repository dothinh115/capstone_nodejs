"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
const global_dto_1 = require("../utils/dto/global.dto");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const global_dto_2 = require("../utils/dto/global.dto");
const admin_guard_1 = require("../guards/admin.guard");
let UserModule = UserModule_1 = class UserModule {
};
UserModule = UserModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [UserModule_1, jwt_1.JwtModule, config_1.ConfigModule, prisma_module_1.PrismaModule],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersProvider, global_dto_1.Response, jwt_strategy_1.JwtStrategy, global_dto_2.Response, admin_guard_1.AdminRole],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=users.module.js.map