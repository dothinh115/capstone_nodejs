import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private model;
    constructor(configService: ConfigService, model: PrismaService);
    validate(payload: {
        tai_khoan: number;
    }): Promise<UserDto>;
}
export {};
