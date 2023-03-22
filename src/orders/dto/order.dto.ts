import { Expose, plainToClass } from 'class-transformer';

export class OrderCreateDto {
  @Expose()
  tai_khoan: number;
  @Expose()
  ma_lich_chieu: number;
  @Expose()
  ma_ghe: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
