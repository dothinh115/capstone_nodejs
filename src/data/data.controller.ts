import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { successMessage } from 'src/utils/variables';
import { dataProvider } from './data.service';
import {
  SeatCreateDto,
  SeatUpdateDto,
  ShowTimeCreateDto,
} from './Dto/data.dto';

@Controller('/data')
export class dataController {
  constructor(private response: Response, private dataService: dataProvider) {}
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
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Administrators,
    permissionConfig.Moderators,
    permissionConfig.Editors,
  )
  @Delete('/deleteShowTime/:ma_lich_chieu')
  async deleteShowTime(@Param('ma_lich_chieu') ma_lich_chieu: string) {
    await this.dataService.deleteShowTime(ma_lich_chieu);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
  @Get('/getShowTime')
  async getShowTime(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('number') number: string,
    @Query('sort') sort: string,
  ) {
    if (from || to) {
      if (!from || !to) {
        throw new HttpException(
          this.response.failRes('phải có đủ from và to'),
          400,
        );
      }
      const data = await this.dataService.getShowTimeFromDateToDate(
        from,
        to,
        number ? number : null,
        sort ? sort : null,
      );
      throw new HttpException(
        this.response.successRes(successMessage, data),
        200,
      );
    } else if (number) {
      const data = await this.dataService.getShowTimeByQuantity(
        number,
        sort ? sort : null,
      );
      throw new HttpException(
        this.response.successRes(successMessage, data),
        200,
      );
    }
    throw new HttpException(
      this.response.successRes('Hướng dẫn sử dụng (query)', {
        from: 'Từ ngày',
        to: 'Đến ngày',
        number: 'Giới hạn số lượng trả về (có hoặc không)',
        sort: 'asc hoặc desc (có hoặc không)',
      }),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Administrators,
    permissionConfig.Moderators,
    permissionConfig.Editors,
  )
  @Post('/createSeat')
  async createSeat(@Body() body: SeatCreateDto) {
    const data = await this.dataService.createSeat(
      SeatCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Administrators,
    permissionConfig.Moderators,
    permissionConfig.Editors,
  )
  @Delete('/deleteSeat/:ma_ghe')
  async deleteSeat(@Param('ma_ghe') ma_ghe: string) {
    await this.dataService.deleteSeat(ma_ghe);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }

  @Get('/getSeatByCinema/:ma_rap')
  async getSeatByCinema(@Param('ma_rap') ma_rap: string) {
    const result = await this.dataService.getSeatByCinema(ma_rap);
    throw new HttpException(
      this.response.successRes(successMessage, result),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Administrators,
    permissionConfig.Moderators,
    permissionConfig.Editors,
  )
  @Put('/updateSeat/:ma_ghe')
  async updateSeat(
    @Param('ma_ghe') ma_ghe: string,
    @Body() body: SeatUpdateDto,
  ) {
    const result = await this.dataService.updateSeat(
      ma_ghe,
      SeatUpdateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, result),
      200,
    );
  }
  @Get('/getShowTimeByMovie/:ma_phim')
  async getShowTimeByMovie(@Param('ma_phim') ma_phim: string) {
    const data = await this.dataService.getShowTimeByMovie(ma_phim);
    if (data.length === 0)
      throw new HttpException(
        this.response.successRes('phim này chưa có lịch chiếu'),
        200,
      );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
