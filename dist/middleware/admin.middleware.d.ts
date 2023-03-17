import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class AdminCheck implements NestMiddleware {
    private model;
    use(req: any, res: any, next: NextFunction): Promise<void>;
}
