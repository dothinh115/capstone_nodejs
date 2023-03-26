import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class MovieDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_phim: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  trailer: string;
  @ApiProperty({ type: 'string' })
  @Expose()
  mo_ta: string;
  @ApiProperty({ type: 'string', example: 'yyyy-mm-dd' })
  @Expose()
  ngay_khoi_chieu: string;
  @ApiProperty({ type: 'number' })
  @Expose()
  danh_gia: number;
  @ApiProperty({ type: 'boolean' })
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

export class MovieCreateDto extends MovieDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @Expose()
  hinh_anh: any;
}

export class MovieUpdateDto extends MovieDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  @Expose()
  ten_phim: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  @Expose()
  trailer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'string' })
  @Expose()
  mo_ta: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'yyyy-mm-dd' })
  @Expose()
  ngay_khoi_chieu: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'number' })
  @Expose()
  danh_gia: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'boolean' })
  @Expose()
  hot: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'boolean' })
  @Expose()
  @ApiPropertyOptional()
  dang_chieu: boolean;

  @ApiProperty({ type: 'boolean' })
  @IsOptional()
  @Expose()
  @ApiPropertyOptional()
  sap_chieu: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  hinh_anh?: any;
}

export class GetMovieQueryDto {
  @ApiPropertyOptional()
  @ApiProperty({ type: 'string', example: 'yyyy-mm-dd' })
  from?: string;
  @ApiPropertyOptional()
  @ApiProperty({ type: 'string', example: 'yyyy-mm-dd' })
  to?: string;
  @ApiPropertyOptional()
  @ApiProperty({ type: 'string' })
  number?: string;
  @ApiPropertyOptional()
  @ApiProperty({ type: 'string' })
  sort?: string;
}
