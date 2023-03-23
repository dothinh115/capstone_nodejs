import { Expose, plainToClass } from 'class-transformer';

export class UpdateUserDto {
  @Expose()
  ho_ten: string;
  @Expose()
  so_dt: string;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class SetPermissionDto {
  @Expose()
  tai_khoan: number;
  @Expose()
  loai_nguoi_dung: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
