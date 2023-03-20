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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { Roles } from 'src/guards/roles.decorator';
import { RoleGuard } from 'src/guards/roles.guard';
import { TokenAuthorization } from 'src/strategy';
import { movieConfig, permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { movieImgCheck } from 'src/utils/function';
import { successMessage } from 'src/utils/variables';
import { MovieCreateDto } from './dto/movies.dto';
import { MoviesProvider } from './movies.service';

@Controller('/movies')
export class MoviesController {
  constructor(
    private moviesProvider: MoviesProvider,
    private response: Response,
  ) {}

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, cb) =>
          cb(null, Date.now() + '_' + file.originalname),
      }),
      fileFilter: function (req, file, callback) {
        movieImgCheck(req, file, callback);
      },
    }),
  )
  async createMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
  ) {
    let data = await this.moviesProvider.createNewMovie(
      req,
      file,
      plainToClass(MovieCreateDto, body, { excludeExtraneousValues: true }),
      +req.user['tai_khoan'],
    );

    throw new HttpException(
      this.response.successRes(successMessage, movieConfig(data)),
      200,
    );
  }

  @UseGuards(TokenAuthorization, RoleGuard)
  @Roles(
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Delete('/deleteMovie/:ma_phim')
  async deleteMovie(@Param('ma_phim') ma_phim: number) {
    await this.moviesProvider.deleteMovie(ma_phim);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }

  @Get('/getMovieInfo/:ma_phim')
  async getMovieInfo(@Param('ma_phim') ma_phim: number) {
    const data = await this.moviesProvider.getMovieInfo(ma_phim);
    throw new HttpException(
      this.response.successRes(successMessage, movieConfig(data)),
      200,
    );
  }

  @Get('/getMovie')
  async getMovie(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('number') number: string,
    @Query('sort') sort: string,
  ) {
    if (from || to) {
      if (!from || !to) {
        throw new HttpException(
          this.response.failRes('Phải đủ cả from và to!'),
          400,
        );
      }

      const data = await this.moviesProvider.getMovieFromDateToDate(
        from,
        to,
        number ? number : null,
        sort ? sort : null,
      );
      if (data.length === 0)
        throw new HttpException(
          this.response.successRes(
            `Không có phim nào được khởi chiếu từ ${from} đến ${to}`,
          ),
          200,
        );
      throw new HttpException(
        this.response.successRes(successMessage, data),
        200,
      );
    } else if (number) {
      const data = await this.moviesProvider.getMovieByQuantity(
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
    permissionConfig.Editors,
    permissionConfig.Moderators,
    permissionConfig.Administrators,
  )
  @Put('/updateMovie/:ma_phim')
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, cb) =>
          cb(null, Date.now() + '_' + file.originalname),
      }),
      fileFilter: function (req, file, callback) {
        movieImgCheck(req, file, callback);
      },
    }),
  )
  async updateMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Param('ma_phim') ma_phim: string,
    @Req() req: Request,
  ) {
    let data = await this.moviesProvider.updateMovie(req, file, body, ma_phim);

    throw new HttpException(
      this.response.successRes(successMessage, movieConfig(data)),
      200,
    );
  }
}
