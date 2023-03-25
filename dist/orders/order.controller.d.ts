import { Request } from 'express';
import { Response } from 'src/utils/dto/global.dto';
import { OrderCreateDto } from './dto/order.dto';
import { OrderProvider } from './order.service';
export declare class OrderController {
    private orderService;
    private response;
    constructor(orderService: OrderProvider, response: Response);
    createOrder(body: OrderCreateDto, req: Request): Promise<void>;
    adminCreate(body: OrderCreateDto): Promise<void>;
    deleteOrder(ma_dat_ve: string): Promise<void>;
}
