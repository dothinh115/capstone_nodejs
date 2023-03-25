import { UserBaseDto, UserDto, UserLoginDto, UserLoginResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthProvider {
    private jwt;
    private configService;
    private model;
    constructor(jwt: JwtService, configService: ConfigService, model: PrismaService);
    signUpProvider({ email, ho_ten, mat_khau, so_dt, }: UserBaseDto): Promise<UserDto>;
    signInProvider({ email, mat_khau, }: UserLoginDto): Promise<UserLoginResponseDto | boolean>;
}
