import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { SeatCreateDto, SeatUpdateDto, ShowTimeCreateDto } from './Dto/data.dto';
export declare class dataProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createShowTime(body: ShowTimeCreateDto): Promise<any>;
    deleteShowTime(ma_lich_chieu: string): Promise<void>;
    getShowTimeFromDateToDate(from: string, to: string, number?: string, sort?: any): Promise<(import(".prisma/client").lich_chieu & {
        phim: import(".prisma/client").phim & {
            nguoi_dung: import(".prisma/client").nguoi_dung & {
                permission: {
                    permission_name: string;
                };
            };
        };
        rap_phim: import(".prisma/client").rap_phim & {
            cum_rap: import(".prisma/client").cum_rap & {
                he_thong_rap: import(".prisma/client").he_thong_rap;
            };
        };
    })[]>;
    getShowTimeByQuantity(number: string | null, sort?: any): Promise<(import(".prisma/client").lich_chieu & {
        phim: import(".prisma/client").phim & {
            nguoi_dung: import(".prisma/client").nguoi_dung & {
                permission: {
                    permission_name: string;
                };
            };
        };
        rap_phim: import(".prisma/client").rap_phim & {
            cum_rap: import(".prisma/client").cum_rap & {
                he_thong_rap: import(".prisma/client").he_thong_rap;
            };
        };
    })[]>;
    createSeat(data: SeatCreateDto): Promise<any>;
    deleteSeat(ma_ghe: string): Promise<void>;
    getSeatByCinema(ma_rap: string): Promise<(import(".prisma/client").ghe & {
        rap_phim: import(".prisma/client").rap_phim & {
            cum_rap: import(".prisma/client").cum_rap & {
                he_thong_rap: import(".prisma/client").he_thong_rap;
            };
        };
    })[]>;
    updateSeat(ma_ghe: string, body: SeatUpdateDto): Promise<any>;
    getShowTimeByMovie(ma_phim: string): Promise<(import(".prisma/client").lich_chieu & {
        rap_phim: import(".prisma/client").rap_phim & {
            cum_rap: import(".prisma/client").cum_rap & {
                he_thong_rap: import(".prisma/client").he_thong_rap;
            };
        };
    })[]>;
}
