import { UserBaseDto, UserDto, UserLoginDto, UserLoginResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthProvider {
    private jwt;
    constructor(jwt: JwtService);
    private model;
    signUpProvider({ email, ho_ten, mat_khau, so_dt, }: UserBaseDto): Promise<UserDto>;
    signInProvider({ email, mat_khau, }: UserLoginDto): Promise<UserLoginResponseDto>;
}
