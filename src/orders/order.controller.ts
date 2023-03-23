import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BannedGuard } from 'src/guards/banned.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { OrderCreateDto } from './dto/order.dto';
import { OrderProvider } from './order.service';

@Controller('/order')
export class OrderController {
  constructor(
    private orderService: OrderProvider,
    private response: Response,
  ) {}
  @UseGuards(TokenAuthorization, BannedGuard)
  @Post('/create')
  async createOrder(@Body() body: OrderCreateDto, @Req() req: Request) {
    const result = await this.orderService.createOrder(
      OrderCreateDto.plainToClass(body),
      req,
    );
    throw new HttpException(
      this.response.successRes(successMessage, result),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Post('/adminCreate')
  async adminCreate(@Body() body: OrderCreateDto) {
    const result = await this.orderService.createOrder(
      OrderCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, result),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Delete('/deleteOrder/:ma_dat_ve')
  async deleteOrder(@Param('ma_dat_ve') ma_dat_ve: string) {
    await this.orderService.deleteOrder(ma_dat_ve);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
}
