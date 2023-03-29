import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional, Matches } from 'class-validator';
import { phoneNumberRequired, so_dt_pattern } from 'src/utils/variables';

export class UpdateUserDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  ho_ten: string;
  @ApiProperty({ type: 'string' })
  @Matches(so_dt_pattern, { message: phoneNumberRequired })
  @Expose()
  so_dt: string;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class SetPermissionDto {
  @ApiProperty({ type: 'number' })
  @Expose()
  tai_khoan: number;
  @ApiProperty({ type: 'number' })
  @Expose()
  loai_nguoi_dung: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
// export class getUserPageDivisionDto {
//   @ApiPropertyOptional()
//   @IsOptional()
//   @ApiProperty({ type: 'string' })
//   @Expose()
//   page: string;
//   @ApiPropertyOptional()
//   @IsOptional()
//   @ApiProperty({ type: 'string' })
//   @Expose()
//   limit: string;
//   @ApiPropertyOptional()
//   @IsOptional()
//   @ApiProperty({ type: 'string' })
//   @Expose()
//   query: string;
// }
