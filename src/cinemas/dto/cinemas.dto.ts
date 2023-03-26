import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CinemasSystemCreateDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  @IsNotEmpty()
  ten_he_thong_rap: string;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemasComplexCreateDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_cum_rap: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  dia_chi: string;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_he_thong_rap: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemasCreateDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_rap: string;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_cum_rap: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class CinemaUpdateDto extends CinemasCreateDto {}

export class CinemaCreateSwaggerBodyDto {
  @ApiProperty({ type: 'string' })
  ten_he_thong_rap: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  logo: any;
}
