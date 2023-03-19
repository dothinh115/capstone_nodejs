import { Expose } from 'class-transformer';

export class UpdateUserDto {
  @Expose()
  ho_ten: string;
  @Expose()
  so_dt: string;
}
