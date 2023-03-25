"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dataModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const global_dto_1 = require("../utils/dto/global.dto");
const data_controller_1 = require("./data.controller");
const data_service_1 = require("./data.service");
let dataModule = dataModule_1 = class dataModule {
};
dataModule = dataModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [dataModule_1, prisma_module_1.PrismaModule],
        controllers: [data_controller_1.dataController],
        providers: [data_service_1.dataProvider, global_dto_1.Response],
    })
], dataModule);
exports.dataModule = dataModule;
//# sourceMappingURL=data.module.js.map