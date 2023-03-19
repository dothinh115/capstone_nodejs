import { Expose } from 'class-transformer';

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
}
