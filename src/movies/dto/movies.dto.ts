import { Expose, plainToClass } from 'class-transformer';

export class MovieCreateDto {
  @Expose()
  hinh_anh: any;
  @Expose()
  ten_phim: string;
  @Expose()
  trailer: string;
  @Expose()
  mo_ta: string;
  @Expose()
  ngay_khoi_chieu: string;
  @Expose()
  danh_gia: number;
  @Expose()
  hot: boolean;
  @Expose()
  dang_chieu: boolean;
  @Expose()
  sap_chieu: boolean;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}

export class MovieUpdateDto extends MovieCreateDto {}
