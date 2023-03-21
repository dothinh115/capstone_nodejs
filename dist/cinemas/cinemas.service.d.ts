import { PrismaService } from 'src/prisma/prisma.service';
import { CinemasComplexCreateDto, CinemasCreateDto, CinemasSystemCreateDto, CinemaUpdateDto } from './dto/cinemas.dto';
import { Response } from 'src/utils/dto/global.dto';
export declare class CinemasProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createCinemaSystem(data: CinemasSystemCreateDto, file: any): Promise<import(".prisma/client").he_thong_rap>;
    deleteCinemaSystem(ma_he_thong_rap: string): Promise<void>;
    getCinemaSystem(): Promise<import(".prisma/client").he_thong_rap[]>;
    createCinemaComlex(data: CinemasComplexCreateDto): Promise<import(".prisma/client").cum_rap>;
    deleteCinemaComlex(ma_cum_rap: string): Promise<import(".prisma/client").cum_rap>;
    createCinema(data: CinemasCreateDto): Promise<import(".prisma/client").rap_phim>;
    getCinemaComplex(): Promise<(import(".prisma/client").cum_rap & {
        he_thong_rap: import(".prisma/client").he_thong_rap;
    })[]>;
    deleteCinema(ma_rap: string): Promise<import(".prisma/client").rap_phim>;
    getCinemaInfo(ma_rap: string): Promise<any>;
    getCinemasByComplex(ma_cum_rap: string): Promise<(import(".prisma/client").rap_phim & {
        cum_rap: import(".prisma/client").cum_rap & {
            he_thong_rap: import(".prisma/client").he_thong_rap;
        };
    })[]>;
    updateCinema(ma_rap: string, data: CinemaUpdateDto): Promise<any>;
}
