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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const strategy_1 = require("../strategy");
const global_dto_1 = require("../utils/dto/global.dto");
const function_1 = require("../utils/function");
const variables_1 = require("../utils/variables");
let AdminController = class AdminController {
    constructor(response) {
        this.response = response;
    }
    async imgSync() {
        await (0, function_1.imgSync)();
        throw new common_1.HttpException(this.response.successRes(variables_1.successMessage), 200);
    }
};
__decorate([
    (0, common_1.Get)('/imgSync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "imgSync", null);
AdminController = __decorate([
    (0, common_1.Controller)('/admin'),
    (0, common_1.UseGuards)(strategy_1.TokenAuthorization, admin_guard_1.AdminRole),
    __metadata("design:paramtypes", [global_dto_1.Response])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map