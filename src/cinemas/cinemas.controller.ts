import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { cinemaSystemConfig, permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { movieImgCheck } from 'src/utils/function';
import { imgRequiredMessage, successMessage } from 'src/utils/variables';
import { CinemasProvider } from './cinemas.service';
import {
  CinemasComplexCreateDto,
  CinemasCreateDto,
  CinemasSystemCreateDto,
} from './dto/cinemas.dto';

@Controller('/cinemas')
export class CinemasController {
  constructor(
    private cinemasService: CinemasProvider,
    private response: Response,
  ) {}

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators)
  @Post('/createCinemaSystem')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img/cinemas',
        filename(req, file, callback) {
          callback(null, Date.now() + '_' + file.originalname);
        },
      }),
      fileFilter(req, file, callback) {
        movieImgCheck(req, file, callback);
      },
    }),
  )
  async createCinemaSystem(
    @Body() body: CinemasSystemCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new HttpException(this.response.failRes(imgRequiredMessage), 400);
    const data = await this.cinemasService.createCinemaSystem(
      CinemasSystemCreateDto.plainToClass(body),
      file,
    );
    throw new HttpException(
      this.response.successRes(successMessage, cinemaSystemConfig(data)),
      200,
    );
  }
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators)
  @Delete('/deleteCinemaSystem/:ma_he_thong_rap')
  async deleteCinemaSystem(@Param('ma_he_thong_rap') ma_he_thong_rap: string) {
    await this.cinemasService.deleteCinemaSystem(ma_he_thong_rap);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }

  @Get('/getCinemaSystem')
  async getCinemaSystem() {
    const data = await this.cinemasService.getCinemaSystem();
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Post('/createCinemaComlex')
  async createCinemaComlex(@Body() body: CinemasComplexCreateDto) {
    const data = await this.cinemasService.createCinemaComlex(
      CinemasComplexCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Delete('/deleteCinemaComlex/:ma_cum_rap')
  async deleteCinemaComlex(@Param('ma_cum_rap') ma_cum_rap: string) {
    await this.cinemasService.deleteCinemaComlex(ma_cum_rap);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
  @Post('/createCinema')
  async createCinema(@Body() body: CinemasCreateDto) {
    const data = await this.cinemasService.createCinema(
      CinemasCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @Get('/getCinemaComlex')
  async getCinemaComlex() {
    const data = await this.cinemasService.getCinemaComplex();
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
