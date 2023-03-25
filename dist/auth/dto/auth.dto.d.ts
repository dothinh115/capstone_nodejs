export declare class UserBaseDto {
    email: string;
    ho_ten: string;
    mat_khau: string;
    so_dt: string;
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T;
}
export declare class UserDto extends UserBaseDto {
    tai_khoan: number;
    loai_nguoi_dung: number;
    mat_khau: string;
}
export interface UserResponseDto {
    message: string;
    data: UserDto;
    dateTime: string;
}
export declare class UserLoginDto {
    email: string;
    mat_khau: string;
}
export declare class UserLoginResponseDto extends UserDto {
    access_token: string;
}
