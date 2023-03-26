export declare class MovieDto {
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
export declare class MovieCreateDto extends MovieDto {
    hinh_anh: any;
}
export declare class MovieUpdateDto extends MovieDto {
    ten_phim: string;
    trailer: string;
    mo_ta: string;
    ngay_khoi_chieu: string;
    danh_gia: number;
    hot: boolean;
    dang_chieu: boolean;
    sap_chieu: boolean;
    hinh_anh?: any;
}
export declare class GetMovieQueryDto {
    from?: string;
    to?: string;
    number?: string;
    sort?: string;
}
