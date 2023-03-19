import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
declare const AdminStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminStrategy extends AdminStrategy_base {
    private model;
    private response;
    constructor(configService: ConfigService, model: PrismaService, response: Response);
    validate(payload: {
        tai_khoan: number;
    }): Promise<{
        tai_khoan: number;
    }>;
}
export {};
