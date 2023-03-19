import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
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
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { movieConfig } from 'src/utils/function';
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
    }),
  )
  async createMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
  ) {
    let data = await this.moviesProvider.createNewMovie(
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
    }),
  )
  async updateMovie(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Param('ma_phim') ma_phim: string,
  ) {
    let data = await this.moviesProvider.updateMovie(file, body, ma_phim);

    throw new HttpException(
      this.response.successRes(successMessage, movieConfig(data)),
      200,
    );
  }
}
