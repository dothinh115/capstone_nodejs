/// <reference types="multer" />
import { Response } from 'src/utils/dto/global.dto';
import { CinemasProvider } from './cinemas.service';
import { CinemasComplexCreateDto, CinemasCreateDto, CinemasSystemCreateDto } from './dto/cinemas.dto';
export declare class CinemasController {
    private cinemasService;
    private response;
    constructor(cinemasService: CinemasProvider, response: Response);
    createCinemaSystem(body: CinemasSystemCreateDto, file: Express.Multer.File): Promise<void>;
    deleteCinemaSystem(ma_he_thong_rap: string): Promise<void>;
    getCinemaSystem(): Promise<void>;
    createCinemaComlex(body: CinemasComplexCreateDto): Promise<void>;
    deleteCinemaComlex(ma_cum_rap: string): Promise<void>;
    createCinema(body: CinemasCreateDto): Promise<void>;
    getCinemaComlex(): Promise<void>;
}
