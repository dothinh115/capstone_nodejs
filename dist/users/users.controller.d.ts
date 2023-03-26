import { Request } from 'express';
import { UserDto } from 'src/auth/dto/auth.dto';
import { Response } from 'src/utils/dto/global.dto';
import { SetPermissionDto, UpdateUserDto } from './dto/users.dto';
import { UsersProvider } from './users.service';
export declare class UsersController {
    private userProvider;
    private response;
    constructor(userProvider: UsersProvider, response: Response);
    getCurrentUserInfo(req: Request): Promise<void>;
    getUserInfo(tai_khoan: number): Promise<UserDto>;
    deleteUser(tai_khoan: number, req: Request): Promise<void>;
    updateUser(tai_khoan: number, body: UpdateUserDto): Promise<void>;
    banUser(tai_khoan: string, req: Request): Promise<void>;
    unBanUser(tai_khoan: string): Promise<void>;
    setPermission(body: SetPermissionDto, req: Request): Promise<void>;
    getAllUser(): Promise<void>;
}
