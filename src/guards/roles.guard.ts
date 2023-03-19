import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'src/utils/dto/global.dto';
import { notAllowedMessage } from 'src/utils/variables';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private response: Response) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!roles) return true;
    const req = context.switchToHttp().getRequest();
    if (req.privateAllowed) return true;
    for (let value of roles) {
      if (req.user.loai_nguoi_dung === value) {
        return true;
      }
    }
    throw new UnauthorizedException(notAllowedMessage);
  }
}
