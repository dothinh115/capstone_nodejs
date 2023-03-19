import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
export declare class AdminRole implements CanActivate {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
