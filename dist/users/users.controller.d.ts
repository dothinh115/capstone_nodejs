import { Request } from 'express';
import { UserBaseDto, UserDto } from 'src/auth/dto/auth.dto';
import { Response } from 'src/utils/dto/global.dto';
import { UsersProvider } from './users.service';
export declare class UsersController {
    private userProvider;
    private response;
    constructor(userProvider: UsersProvider, response: Response);
    getCurrentUserInfo(req: Request): Promise<void>;
    getUserInfo(tai_khoan: number): Promise<UserDto>;
    deleteUser(tai_khoan: number): Promise<void>;
    updateUser(tai_khoan: number, body: UserBaseDto, req: Request): Promise<void>;
}
