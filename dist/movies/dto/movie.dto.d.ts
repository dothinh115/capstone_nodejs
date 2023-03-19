export declare class NguoiDung {
    tai_khoan: number;
    ho_ten: string;
    email: string;
    so_dt: string;
    mat_khau?: string;
    loai_nguoi_dung?: number;
    permission?: any;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class Permission {
    permission_name?: string;
}
export declare class MovieDto {
    ma_phim: number;
    ten_phim: string;
    trailer: string;
    hinh_anh: string;
    mo_ta: string;
    ngay_khoi_chieu: Date;
    danh_gia: number;
    hot: boolean;
    dang_chieu: boolean;
    sap_chieu: boolean;
    tai_khoan: number;
    nguoi_dung: NguoiDung;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
