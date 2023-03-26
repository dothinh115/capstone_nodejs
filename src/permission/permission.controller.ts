import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { PermissionProvider } from './permission.service';
@ApiTags('Permission')
@Controller('/permission')
export class PerrmissionController {
  constructor(
    private response: Response,
    private permissProvider: PermissionProvider,
  ) {}
  @Get('/getAllPermission')
  async getAllPermission() {
    const data = await this.permissProvider.getAllPermission();
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
