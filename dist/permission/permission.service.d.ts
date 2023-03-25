import { PrismaService } from 'src/prisma/prisma.service';
export declare class PermissionProvider {
    private model;
    constructor(model: PrismaService);
    getAllPermission(): Promise<{}>;
}
