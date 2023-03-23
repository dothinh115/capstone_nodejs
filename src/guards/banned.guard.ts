import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { permissionConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { bannedUserMessage } from 'src/utils/variables';

@Injectable()
export class BannedGuard implements CanActivate {
  constructor(private response: Response) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user.permission.permission_value === permissionConfig.Banned)
      throw new HttpException(this.response.failRes(bannedUserMessage), 400);
    return true;
  }
}
