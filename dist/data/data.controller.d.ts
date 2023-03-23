import { Response } from 'src/utils/dto/global.dto';
import { dataProvider } from './data.service';
import { SeatCreateDto, SeatUpdateDto, ShowTimeCreateDto } from './Dto/data.dto';
export declare class dataController {
    private response;
    private dataService;
    constructor(response: Response, dataService: dataProvider);
    createShowTime(body: ShowTimeCreateDto): Promise<void>;
    deleteShowTime(ma_lich_chieu: string): Promise<void>;
    getShowTime(from: string, to: string, number: string | null, sort: string): Promise<void>;
    createSeat(body: SeatCreateDto): Promise<void>;
    deleteSeat(ma_ghe: string): Promise<void>;
    getSeatByCinema(ma_rap: string): Promise<void>;
    updateSeat(ma_ghe: string, body: SeatUpdateDto): Promise<void>;
    getShowTimeByMovie(ma_phim: string): Promise<void>;
}
