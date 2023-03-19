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
exports.AdminProvider = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const prisma_service_1 = require("../prisma/prisma.service");
const variables_1 = require("../utils/variables");
let AdminProvider = class AdminProvider {
    constructor(model) {
        this.model = model;
    }
    async imgSync() {
        const movieList = await this.model.phim.findMany();
        fs.readdir(variables_1.movieImgPath, (err, files) => {
            files.forEach((file) => {
                const find = movieList.find((item) => item.hinh_anh === file);
                if (!find)
                    fs.unlinkSync(`${variables_1.movieImgPath + file}`);
            });
        });
    }
};
AdminProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProvider);
exports.AdminProvider = AdminProvider;
//# sourceMappingURL=admin.service.js.map