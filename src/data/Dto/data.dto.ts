import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';

export class ShowTimeCreateDto {
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_rap: number;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_phim: number;
  @ApiProperty({ type: 'string' })
  @Expose()
  ngay_gio_chieu: string;
  @ApiProperty({ type: 'number' })
  @Expose()
  gia_ve: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class SeatCreateDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_ghe: string;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_rap: number;
  @ApiProperty({ type: 'string' })
  @Expose()
  loai_ghe: string;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}

export class SeatUpdateDto extends SeatCreateDto {
  @ApiProperty({ type: 'number' })
  @Exclude()
  ma_rap: number;
}
