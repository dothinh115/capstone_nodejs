import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { imgSyncDecription, successMessage } from 'src/utils/variables';
import { AdminProvider } from './admin.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('/admin')
@UseGuards(TokenAuthorization, RoleGuard)
@Roles(permissionConfig.Administrators)
export class AdminController {
  constructor(
    private response: Response,
    private adminProvider: AdminProvider,
  ) {}
  @ApiOperation({ summary: imgSyncDecription })
  @Get('/imgSync')
  async imgSync() {
    await this.adminProvider.imgSync();
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
}
