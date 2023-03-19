import { Response, ResponseInterface } from 'src/utils/dto/global.dto';
import { AuthProvider } from './auth.service';
import { UserBaseDto, UserLoginDto } from './dto/auth.dto';
export declare class AuthController {
    private user;
    private response;
    constructor(user: AuthProvider, response: Response);
    signUp(data: UserBaseDto): Promise<ResponseInterface>;
    signIn(data: UserLoginDto): Promise<ResponseInterface>;
}
