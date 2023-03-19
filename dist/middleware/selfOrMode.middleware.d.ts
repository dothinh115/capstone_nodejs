import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response as Res } from 'src/utils/dto/global.dto';
export declare class SelfOrModeMidlleWare implements NestMiddleware {
    private model;
    private response;
    constructor(model: PrismaService, response: Res);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
