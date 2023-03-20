import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { UserBaseDto, UserDto } from 'src/auth/dto/auth.dto';
import { OwnID } from 'src/guards/ownId.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig, userConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { UpdateUserDto } from './dto/users.dto';
import { UsersProvider } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private userProvider: UsersProvider,
    private response: Response,
  ) {}

  @UseGuards(TokenAuthorization)
  @Get('/getCurrentUserInfo')
  async getCurrentUserInfo(@Req() req: Request) {
    const data = await req.user;
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }

  @Get('/getUserInfo/:tai_khoan')
  async getUserInfo(@Param('tai_khoan') tai_khoan: number): Promise<UserDto> {
    const result = await this.userProvider.getUserInfo(tai_khoan);
    throw new HttpException(
      this.response.successRes(successMessage, userConfig(result)),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators)
  @Delete('/deleteUser/:tai_khoan')
  async deleteUser(@Param('tai_khoan') tai_khoan: number) {
    await this.userProvider.deleteUserProvider(tai_khoan);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }

  @UseGuards(TokenAuthorization, OwnID, RoleGuard)
  @Roles(permissionConfig.Moderators, permissionConfig.Administrators)
  @UsePipes(new ValidationPipe())
  @Put('/update/:tai_khoan')
  async updateUser(
    @Param('tai_khoan') tai_khoan: number,
    @Body() body: UpdateUserDto,
  ) {
    const data = await this.userProvider.updateUser(
      tai_khoan,
      plainToClass(UpdateUserDto, body, {
        excludeExtraneousValues: true,
      }),
    );
    throw new HttpException(
      this.response.successRes(successMessage, userConfig(data)),
      200,
    );
  }
}
