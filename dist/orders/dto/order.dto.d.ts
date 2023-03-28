export declare class OrderCreateDto {
    tai_khoan: number;
    ma_lich_chieu: number;
    ma_ghe: number;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class OrderAdminCreateDto extends OrderCreateDto {
    tai_khoan: number;
}
