import { Request } from 'express';
import { Response } from 'src/utils/dto/global.dto';
import { OrderAdminCreateDto, OrderCreateDto } from './dto/order.dto';
import { OrderProvider } from './order.service';
export declare class OrderController {
    private orderService;
    private response;
    constructor(orderService: OrderProvider, response: Response);
    createOrder(body: OrderCreateDto, req: Request): Promise<void>;
    adminCreate(body: OrderAdminCreateDto): Promise<void>;
    deleteOrder(ma_dat_ve: string): Promise<void>;
    getCurrentOrder(req: Request): Promise<void>;
}
