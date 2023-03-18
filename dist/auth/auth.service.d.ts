import { UserBaseDto, UserDto, UserLoginDto, UserLoginResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthProvider {
    private jwt;
    private configService;
    constructor(jwt: JwtService, configService: ConfigService);
    private model;
    signUpProvider({ email, ho_ten, mat_khau, so_dt, }: UserBaseDto): Promise<UserDto>;
    signInProvider({ email, mat_khau, }: UserLoginDto): Promise<UserLoginResponseDto>;
}
