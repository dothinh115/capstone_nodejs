/// <reference types="multer" />
import { Request } from 'express';
import { Response } from 'src/utils/dto/global.dto';
import { MoviesProvider } from './movies.service';
export declare class MoviesController {
    private moviesProvider;
    private response;
    constructor(moviesProvider: MoviesProvider, response: Response);
    createMovie(file: Express.Multer.File, body: any, req: Request): Promise<void>;
    deleteMovie(ma_phim: number): Promise<void>;
    getMovieInfo(ma_phim: number): Promise<void>;
    updateMovie(file: Express.Multer.File, body: any, ma_phim: string): Promise<void>;
}
