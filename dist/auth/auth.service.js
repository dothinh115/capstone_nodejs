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
exports.AuthProvider = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const variables_1 = require("../utils/variables");
const jwt_1 = require("@nestjs/jwt");
let AuthProvider = class AuthProvider {
    constructor(jwt) {
        this.jwt = jwt;
        this.model = new client_1.PrismaClient();
    }
    async signUpProvider({ email, ho_ten, mat_khau, so_dt, }) {
        const userExistCheck = await this.model.nguoi_dung.findFirst({
            where: {
                email,
            },
        });
        if (userExistCheck)
            throw new common_1.HttpException(variables_1.alreadyExistedEmailMessage, 400);
        const data = {
            email,
            ho_ten,
            mat_khau: await bcrypt.hashSync(mat_khau, variables_1.bcrypt_loops),
            so_dt,
        };
        return await this.model.nguoi_dung.create({
            data,
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
    }
    async signInProvider({ email, mat_khau, }) {
        const result = await this.model.nguoi_dung.findFirst({
            where: {
                email,
            },
            include: {
                permission: {
                    select: {
                        permission_name: true,
                    },
                },
            },
        });
        if (!result)
            throw new common_1.HttpException(variables_1.loginErrorMessage, 400);
        if (bcrypt.compareSync(mat_khau, result.mat_khau)) {
            return Object.assign(Object.assign({}, result), { access_token: this.jwt.sign(result) });
        }
        throw new common_1.HttpException(variables_1.loginErrorMessage, 400);
    }
};
AuthProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthProvider);
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=auth.service.js.map