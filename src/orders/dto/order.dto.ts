import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class OrderCreateDto {
  @Expose()
  tai_khoan: number;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_lich_chieu: number;
  @ApiProperty({ type: 'number' })
  @Expose()
  ma_ghe: number;
  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
export class OrderAdminCreateDto extends OrderCreateDto {
  @ApiProperty({ type: 'number' })
  tai_khoan: number;
}
