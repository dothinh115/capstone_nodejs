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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from 'src/auth/dto/auth.dto';
import { OwnID } from 'src/guards/ownId.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig, userConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { SetPermissionDto, UpdateUserDto } from './dto/users.dto';
import { UsersProvider } from './users.service';

@ApiTags('User')
@Controller('/users')
export class UsersController {
  constructor(
    private userProvider: UsersProvider,
    private response: Response,
  ) {}

  @ApiBearerAuth()
  @UseGuards(TokenAuthorization)
  @Get('/getCurrentUserInfo')
  async getCurrentUserInfo(@Req() req: Request) {
    const data = await userConfig(req.user);
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

  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators)
  @Delete('/deleteUser/:tai_khoan')
  async deleteUser(@Param('tai_khoan') tai_khoan: number, @Req() req: Request) {
    await this.userProvider.deleteUserProvider(tai_khoan, req.user);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }

  @ApiBearerAuth()
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
      UpdateUserDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, userConfig(data)),
      200,
    );
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Put('/banUser/:tai_khoan')
  async banUser(@Param('tai_khoan') tai_khoan: string, @Req() req: Request) {
    const data = await this.userProvider.banUser(tai_khoan, req);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Put('/unBanUser/:tai_khoan')
  async unBanUser(@Param('tai_khoan') tai_khoan: string) {
    const data = await this.userProvider.unBanUser(tai_khoan);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Put('/setPermission')
  async setPermission(@Body() body: SetPermissionDto, @Req() req: Request) {
    const data = await this.userProvider.setPermission(
      SetPermissionDto.plainToClass(body),
      req,
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @Get('getAllUser')
  async getAllUser() {
    const data = await this.userProvider.getAllUser();
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
