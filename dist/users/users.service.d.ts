import { UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { SetPermissionDto, UpdateUserDto } from './dto/users.dto';
export declare class UsersProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    deleteUserProvider(tai_khoan: number, user: any): Promise<void>;
    getUserInfo(tai_khoan: number): Promise<import(".prisma/client").nguoi_dung & {
        permission: {
            permission_name: string;
        };
    }>;
    updateUser(tai_khoan: number, body: UpdateUserDto): Promise<UserDto>;
    banUser(tai_khoan: string, req: any): Promise<any>;
    unBanUser(tai_khoan: string): Promise<any>;
    setPermission(data: SetPermissionDto, req: any): Promise<any>;
    getAllUser(): Promise<(import(".prisma/client").nguoi_dung & {
        permission: import(".prisma/client").permission;
    })[]>;
    getUserPageDivision(page?: string, limit?: string): Promise<(import(".prisma/client").nguoi_dung & {
        permission: {
            permission_name: string;
        };
    })[]>;
    getUserByNamePageDivision(page?: string, limit?: string, query?: string): Promise<(import(".prisma/client").nguoi_dung & {
        permission: {
            permission_name: string;
        };
    })[]>;
    getUserByName(keyword: string): Promise<(import(".prisma/client").nguoi_dung & {
        permission: {
            permission_name: string;
        };
    })[]>;
}
