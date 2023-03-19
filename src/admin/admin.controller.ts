import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { AdminRole } from 'src/guards/admin.guard';
import { TokenAuthorization } from 'src/strategy';
import { Response } from 'src/utils/dto/global.dto';
import { imgSync } from 'src/utils/function';
import { successMessage } from 'src/utils/variables';

@Controller('/admin')
@UseGuards(TokenAuthorization, AdminRole)
export class AdminController {
  constructor(private response: Response) {}
  @Get('/imgSync')
  async imgSync() {
    await imgSync();
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
}
