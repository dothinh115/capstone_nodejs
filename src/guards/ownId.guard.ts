import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OwnID implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { params } = context.getArgs()[0];
    if (req.user.tai_khoan === +params.tai_khoan) req.privateAllowed = true;
    return true;
  }
}
