import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { cinemaSystemConfig, permissionConfig } from 'src/utils/config';
import { Response, ResponseInterface } from 'src/utils/dto/global.dto';
import { movieImgCheck } from 'src/utils/function';
import { imgRequiredMessage, successMessage } from 'src/utils/variables';
import { CinemasProvider } from './cinemas.service';
import {
  CinemaCreateSwaggerBodyDto,
  CinemasComplexCreateDto,
  CinemasCreateDto,
  CinemasSystemCreateDto,
  CinemaUpdateDto,
} from './dto/cinemas.dto';

@ApiTags('Cinemas')
@Controller('/cinemas')
export class CinemasController {
  constructor(
    private cinemasService: CinemasProvider,
    private response: Response,
  ) {}
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CinemaCreateSwaggerBodyDto,
  })
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
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseInterface> {
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Post('/createCinemaComplex')
  async createCinemaComlex(@Body() body: CinemasComplexCreateDto) {
    const data = await this.cinemasService.createCinemaComlex(
      CinemasComplexCreateDto.plainToClass(body),
    );
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Delete('/deleteCinemaComlex/:ma_cum_rap')
  async deleteCinemaComlex(@Param('ma_cum_rap') ma_cum_rap: string) {
    await this.cinemasService.deleteCinemaComlex(ma_cum_rap);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
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
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Delete('/deleteCinema/:ma_rap')
  async deleteCinema(@Param('ma_rap') ma_rap: string) {
    await this.cinemasService.deleteCinema(ma_rap);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
  @Get('/getCinemaInfo/:ma_rap')
  async getCinemaInfo(@Param('ma_rap') ma_rap: string) {
    const data = await this.cinemasService.getCinemaInfo(ma_rap);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @Get('/getCinemasByComplex/:ma_cum_rap')
  async getCinemasByComplex(@Param('ma_cum_rap') ma_cum_rap: string) {
    const data = await this.cinemasService.getCinemasByComplex(ma_cum_rap);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
  @ApiBearerAuth()
  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(permissionConfig.Administrators, permissionConfig.Moderators)
  @Put('/updateCinema/:ma_rap')
  async updateCinema(
    @Param('ma_rap') ma_rap: string,
    @Body() body: CinemaUpdateDto,
  ) {
    const data = await this.cinemasService.updateCinema(ma_rap, body);
    throw new HttpException(
      this.response.successRes(successMessage, data),
      200,
    );
  }
}
