import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BannedGuard } from 'src/guards/banned.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { OrderAdminCreateDto, OrderCreateDto } from './dto/order.dto';
import { OrderProvider } from './order.service';

@ApiTags('Order')
@Controller('/order')
export class OrderController {
  constructor(
    private orderService: OrderProvider,
    private response: Response,
  ) {}

  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Post('/adminCreate')
  async adminCreate(@Body() body: OrderAdminCreateDto, @Req() req: Request) {
    const result = await this.orderService.createOrder(
      OrderAdminCreateDto.plainToClass(body),
      req,
    );
    throw new HttpException(
      this.response.successRes(successMessage, result),
      200,
    );
  }
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Get('/getCurrentOrder')
  async getCurrentOrder(@Req() req: Request) {
    const data = await this.orderService.getCurrentOrder(req);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @Get('/getOrderByShowTime/:ma_lich_chieu')
  async getOrderByShowTime(@Param('ma_lich_chieu') ma_lich_chieu: string) {
    const data = await this.orderService.getOrderByShowTime(ma_lich_chieu);
    if (data.length === 0)
      throw new HttpException(
        this.response.successRes('lịch chiếu này chưa có người đặt vé'),
        200,
      );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
