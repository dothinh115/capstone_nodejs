import { Exclude, plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { so_dt_pattern, successMessage } from 'src/utils/variables';
import * as moment from 'moment';

//USER
export class UserBaseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  ho_ten: string;

  @IsNotEmpty()
  mat_khau: string;

  @IsNotEmpty()
  @Matches(so_dt_pattern)
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
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  mat_khau: string;
}

export class UserLoginResponseDto extends UserDto {
  access_token: string;
}
