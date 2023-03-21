import { Expose, plainToClass } from 'class-transformer';

export class ShowTimeCreateDto {
  @Expose()
  ma_rap: number;
  @Expose()
  ma_phim: number;
  @Expose()
  ngay_gio_chieu: string;
  @Expose()
  gia_ve: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
