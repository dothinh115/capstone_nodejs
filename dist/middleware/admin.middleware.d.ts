import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AdminCheck implements NestMiddleware {
    private model;
    constructor(model: PrismaService);
    use(req: any, res: any, next: NextFunction): Promise<void>;
}
