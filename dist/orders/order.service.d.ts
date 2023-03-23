import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { OrderCreateDto } from './dto/order.dto';
export declare class OrderProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createOrder(body: OrderCreateDto, req?: any): Promise<any>;
    deleteOrder(ma_dat_ve: string): Promise<void>;
}
