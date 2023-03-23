import { PrismaService } from 'src/prisma/prisma.service';
export declare class AdminProvider {
    private model;
    constructor(model: PrismaService);
    imgSync(): Promise<any>;
    movieSync(): Promise<void>;
}
