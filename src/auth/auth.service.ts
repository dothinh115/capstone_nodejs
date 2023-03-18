import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  UserBaseDto,
  UserDto,
  UserLoginDto,
  UserLoginResponseDto,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import {
  alreadyExistedEmailMessage,
  loginErrorMessage,
} from 'src/utils/variables';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthProvider {
  constructor(private jwt: JwtService, private configService: ConfigService) {}
  private model = new PrismaClient();

  async signUpProvider({
    email,
    ho_ten,
    mat_khau,
    so_dt,
  }: UserBaseDto): Promise<UserDto> {
    const userExistCheck = await this.model.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (userExistCheck)
      throw new HttpException(alreadyExistedEmailMessage, 400);
    const data = {
      email,
      ho_ten,
      mat_khau: await bcrypt.hashSync(
        mat_khau,
        Number(this.configService.get('BCRYPT_LOOPS')),
      ),
      so_dt,
    };
    return await this.model.nguoi_dung.create({
      data,
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
  }

  async signInProvider({
    email,
    mat_khau,
  }: UserLoginDto): Promise<UserLoginResponseDto> {
    const result = await this.model.nguoi_dung.findFirst({
      where: {
        email,
      },
      include: {
        permission: {
          select: {
            permission_name: true,
          },
        },
      },
    });
    if (!result) throw new HttpException(loginErrorMessage, 400);

    if (bcrypt.compareSync(mat_khau, result.mat_khau)) {
      return {
        ...result,
        access_token: this.jwt.sign(result),
      };
    }
    throw new HttpException(loginErrorMessage, 400);
  }
}
