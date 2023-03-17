import { Request } from 'express';
import { UsersProvider } from './users.service';
export declare class UsersController {
    private user;
    constructor(user: UsersProvider);
    getAllUsers(req: Request): Promise<import(".prisma/client").nguoi_dung[]>;
}
