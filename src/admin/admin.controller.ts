import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { AdminRole } from 'src/guards/admin.guard';
import { TokenAuthorization } from 'src/strategy';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { AdminProvider } from './admin.service';

@Controller('/admin')
@UseGuards(TokenAuthorization, AdminRole)
export class AdminController {
  constructor(
    private response: Response,
    private adminProvider: AdminProvider,
  ) {}
  @Get('/imgSync')
  async imgSync() {
    await this.adminProvider.imgSync();
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
}
