export declare class ShowTimeCreateDto {
    ma_rap: number;
    ma_phim: number;
    ngay_gio_chieu: string;
    gia_ve: number;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class SeatCreateDto {
    ten_ghe: string;
    ma_rap: number;
    loai_ghe: string;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class SeatUpdateDto extends SeatCreateDto {
    ma_rap: number;
}
