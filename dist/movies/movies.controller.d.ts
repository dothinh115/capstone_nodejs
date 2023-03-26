/// <reference types="multer" />
import { Response } from 'src/utils/dto/global.dto';
import { GetMovieQueryDto, MovieUpdateDto } from './dto/movies.dto';
import { MoviesProvider } from './movies.service';
export declare class MoviesController {
    private moviesProvider;
    private response;
    constructor(moviesProvider: MoviesProvider, response: Response);
    createMovie(file: Express.Multer.File, body: any, req: any): Promise<void>;
    deleteMovie(ma_phim: number): Promise<void>;
    getMovieInfo(ma_phim: number): Promise<void>;
    getMovie(query: GetMovieQueryDto): Promise<void>;
    updateMovie(file: Express.Multer.File, body: MovieUpdateDto, ma_phim: string, req: any): Promise<void>;
}
