"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MoviesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const global_dto_1 = require("../utils/dto/global.dto");
const movies_controller_1 = require("./movies.controller");
const movies_service_1 = require("./movies.service");
let MoviesModule = MoviesModule_1 = class MoviesModule {
};
MoviesModule = MoviesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [MoviesModule_1, prisma_module_1.PrismaModule],
        controllers: [movies_controller_1.MoviesController],
        providers: [movies_service_1.MoviesProvider, global_dto_1.Response],
    })
], MoviesModule);
exports.MoviesModule = MoviesModule;
//# sourceMappingURL=movies.module.js.map