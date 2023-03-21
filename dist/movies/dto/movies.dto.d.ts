export declare class MovieCreateDto {
    hinh_anh: any;
    ten_phim: string;
    trailer: string;
    mo_ta: string;
    ngay_khoi_chieu: string;
    danh_gia: number;
    hot: boolean;
    dang_chieu: boolean;
    sap_chieu: boolean;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class MovieUpdateDto extends MovieCreateDto {
}
