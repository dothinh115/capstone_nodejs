/// <reference types="multer" />
import { Response, ResponseInterface } from 'src/utils/dto/global.dto';
import { CinemasProvider } from './cinemas.service';
import { CinemasComplexCreateDto, CinemasCreateDto, CinemaUpdateDto } from './dto/cinemas.dto';
export declare class CinemasController {
    private cinemasService;
    private response;
    constructor(cinemasService: CinemasProvider, response: Response);
    createCinemaSystem(body: any, file: Express.Multer.File): Promise<ResponseInterface>;
    deleteCinemaSystem(ma_he_thong_rap: string): Promise<void>;
    getCinemaSystem(): Promise<void>;
    createCinemaComlex(body: CinemasComplexCreateDto): Promise<void>;
    deleteCinemaComlex(ma_cum_rap: string): Promise<void>;
    createCinema(body: CinemasCreateDto): Promise<void>;
    getCinemaComlex(): Promise<void>;
    deleteCinema(ma_rap: string): Promise<void>;
    getCinemaInfo(ma_rap: string): Promise<void>;
    getCinemasByComplex(ma_cum_rap: string): Promise<void>;
    updateCinema(ma_rap: string, body: CinemaUpdateDto): Promise<void>;
}
