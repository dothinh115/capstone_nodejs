import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { EditorAuthorization } from 'src/strategy';
import { Response } from 'src/utils/dto/global.dto';
import { movieConfig } from 'src/utils/function';
import { successMessage } from 'src/utils/variables';
import { MoviesProvider } from './movies.service';

@Controller('/movies')
export class MoviesController {
  constructor(
    private moviesProvider: MoviesProvider,
    private response: Response,
  ) {}

  @UseGuards(EditorAuthorization)
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
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
  ) {
    const data = await this.moviesProvider.createNewMovie(
      file,
      body,
      +req.user['tai_khoan'],
    );
    throw new HttpException(
      this.response.successRes(successMessage, movieConfig(data)),
      200,
    );
  }

  @UseGuards(EditorAuthorization)
  @Delete('/deleteMovie/:ma_phim')
  async deleteMovie(@Param('ma_phim') ma_phim: number) {
    await this.moviesProvider.deleteMovie(ma_phim);
    throw new HttpException(this.response.successRes(successMessage), 200);
  }
}
