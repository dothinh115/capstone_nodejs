import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { phoneNumberRequired, so_dt_pattern } from 'src/utils/variables';

//USER
export class UserBaseDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Điền đúng định dạng email!' })
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  ho_ten: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  mat_khau: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @Matches(so_dt_pattern, { message: phoneNumberRequired })
  so_dt: string;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToClass(this, obj, { exposeUnsetFields: true });
  }
}

export class UserDto extends UserBaseDto {
  tai_khoan: number;
  loai_nguoi_dung: number;
  @Exclude()
  mat_khau: string;
}

export interface UserResponseDto {
  message: string;
  data: UserDto;
  dateTime: string;
}

//LOGIN
export class UserLoginDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  mat_khau: string;
}

export class UserLoginResponseDto extends UserDto {
  access_token: string;
}
