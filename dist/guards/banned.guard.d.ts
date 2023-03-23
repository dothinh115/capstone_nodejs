import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Response } from 'src/utils/dto/global.dto';
export declare class BannedGuard implements CanActivate {
    private response;
    constructor(response: Response);
    canActivate(context: ExecutionContext): boolean;
}
