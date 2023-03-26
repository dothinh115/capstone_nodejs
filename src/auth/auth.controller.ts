import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userConfig } from 'src/utils/config';
import { Response, ResponseInterface } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { AuthProvider } from './auth.service';
import { UserBaseDto, UserLoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('/users')
export class AuthController {
  constructor(private user: AuthProvider, private response: Response) {}

  @UsePipes(new ValidationPipe())
  @Post('/signUp')
  async signUp(@Body() data: UserBaseDto): Promise<ResponseInterface> {
    let user = await this.user.signUpProvider(data);
    user = userConfig(user);
    throw new HttpException(
      this.response.successRes(successMessage, user),
      200,
    );
  }

  @Post('/signIn')
  async signIn(@Body() data: UserLoginDto): Promise<ResponseInterface> {
    let user = await this.user.signInProvider(data);
    user = userConfig(user);
    throw new HttpException(
      this.response.successRes(successMessage, user),
      200,
    );
  }
}
