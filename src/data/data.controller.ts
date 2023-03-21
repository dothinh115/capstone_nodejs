import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { dataProvider } from './data.service';
import { ShowTimeCreateDto } from './Dto/data.dto';

@Controller('/data')
export class dataController {
  constructor(
    private model: PrismaService,
    private response: Response,
    private dataService: dataProvider,
  ) {}
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Administrators,
    permissionConfig.Editors,
    permissionConfig.Moderators,
  )
  @Post('/createShowTime')
  async createShowTime(@Body() body: ShowTimeCreateDto) {
    const data = await this.dataService.createShowTime(
      ShowTimeCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
