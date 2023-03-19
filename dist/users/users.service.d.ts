import { UserBaseDto, UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
export declare class UsersProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    deleteUserProvider(tai_khoan: number): Promise<void>;
    getUserInfo(tai_khoan: number): Promise<import(".prisma/client").nguoi_dung & {
        permission: {
            permission_name: string;
        };
    }>;
    updateUser(tai_khoan: number, body: UserBaseDto): Promise<UserDto>;
}
