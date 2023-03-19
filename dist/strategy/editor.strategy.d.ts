import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
declare const EditorStrategy_base: new (...args: any[]) => Strategy;
export declare class EditorStrategy extends EditorStrategy_base {
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
