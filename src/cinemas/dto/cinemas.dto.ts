import { Expose, plainToClass } from 'class-transformer';

export class CinemasSystemCreateDto {
  @Expose()
  ten_he_thong_rap: string;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemasComplexCreateDto {
  @Expose()
  ten_cum_rap: string;
  @Expose()
  dia_chi: string;
  @Expose()
  ma_he_thong_rap: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemasCreateDto {
  @Expose()
  ten_rap: string;
  @Expose()
  ma_cum_rap: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemaUpdateDto extends CinemasCreateDto {}
