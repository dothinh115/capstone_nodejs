"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PermissionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const global_dto_1 = require("../utils/dto/global.dto");
const permission_controller_1 = require("./permission.controller");
const permission_service_1 = require("./permission.service");
let PermissionModule = PermissionModule_1 = class PermissionModule {
};
PermissionModule = PermissionModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [PermissionModule_1, prisma_module_1.PrismaModule],
        controllers: [permission_controller_1.PerrmissionController],
        providers: [permission_service_1.PermissionProvider, global_dto_1.Response],
    })
], PermissionModule);
exports.PermissionModule = PermissionModule;
//# sourceMappingURL=permission.module.js.map