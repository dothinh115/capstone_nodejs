import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'src/utils/dto/global.dto';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private response;
    constructor(reflector: Reflector, response: Response);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
