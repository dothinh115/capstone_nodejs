import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as moment from 'moment';
import { userConfig } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { AuthProvider } from './auth.service';
import {
  UserBaseDto,
  UserDto,
  UserLoginDto,
  UserResponseDto,
} from './dto/auth.dto';

@Controller('/users')
export class AuthController {
  constructor(private user: AuthProvider) {}

  @UsePipes(new ValidationPipe())
  @Post('/signUp')
  async signUp(@Body() data: UserBaseDto): Promise<UserResponseDto> {
    let user = await this.user.signUpProvider(data);
    user = userConfig(user);
    return {
      message: successMessage,
      data: UserDto.plainToClass(user),
      dateTime: moment().format(),
    };
  }

  @Post('/signIn')
  async signIn(@Body() data: UserLoginDto): Promise<UserResponseDto> {
    let user = await this.user.signInProvider(data);
    user = userConfig(user);
    return {
      message: successMessage,
      data: UserDto.plainToClass(user),
      dateTime: moment().format(),
    };
  }
}
