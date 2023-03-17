import { AuthProvider } from './auth.service';
import { UserBaseDto, UserLoginDto, UserResponseDto } from './dto/auth.dto';
export declare class AuthController {
    private user;
    constructor(user: AuthProvider);
    signUp(data: UserBaseDto): Promise<UserResponseDto>;
    signIn(data: UserLoginDto): Promise<UserResponseDto>;
}
