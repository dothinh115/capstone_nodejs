import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class MovieCreateDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @Expose()
  hinh_anh: any;
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_phim: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  trailer: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  mo_ta: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  ngay_khoi_chieu: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  danh_gia: number;
  @ApiProperty({ type: 'string' })
  @Expose()
  hot: boolean;
  @ApiProperty({ type: 'boolean' })
  @Expose()
  dang_chieu: boolean;
  @ApiProperty({ type: 'boolean' })
  @Expose()
  sap_chieu: boolean;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}

export class MovieUpdateDto extends MovieCreateDto {}
