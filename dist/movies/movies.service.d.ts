/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { MovieCreateDto, MovieUpdateDto } from './dto/movies.dto';
export declare class MoviesProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createNewMovie(req: any, file: Express.Multer.File, body: MovieCreateDto, tai_khoan: number): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
    deleteMovie(ma_phim: number): Promise<void>;
    getMovieInfo(ma_phim: any): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
    updateMovie(file: Express.Multer.File, body: MovieUpdateDto, ma_phim: string): Promise<import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    }>;
    getMovieFromDateToDate(from: string, to: string, number?: null | string, sort?: any): Promise<(import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    })[]>;
    getMovieByQuantity(number: string, sort?: any): Promise<(import(".prisma/client").phim & {
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
    })[]>;
}
