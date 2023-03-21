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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../guards/roles.decorator");
const roles_guard_1 = require("../guards/roles.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const strategy_1 = require("../strategy");
const config_1 = require("../utils/config");
const global_dto_1 = require("../utils/dto/global.dto");
const variables_1 = require("../utils/variables");
const data_service_1 = require("./data.service");
const data_dto_1 = require("./Dto/data.dto");
let dataController = class dataController {
    constructor(model, response, dataService) {
        this.model = model;
        this.response = response;
        this.dataService = dataService;
    }
    async createShowTime(body) {
        const data = await this.dataService.createShowTime(data_dto_1.ShowTimeCreateDto.plainToClass(body));
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage, data), 200);
    }
};
__decorate([
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(config_1.permissionConfig.Administrators, config_1.permissionConfig.Editors, config_1.permissionConfig.Moderators),
    (0, common_1.Post)('/createShowTime'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_dto_1.ShowTimeCreateDto]),
    __metadata("design:returntype", Promise)
], dataController.prototype, "createShowTime", null);
dataController = __decorate([
    (0, common_1.Controller)('/data'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        global_dto_1.Response,
        data_service_1.dataProvider])
], dataController);
exports.dataController = dataController;
//# sourceMappingURL=data.controller.js.map