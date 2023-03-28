import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/utils/dto/global.dto';
import { OrderCreateDto } from './dto/order.dto';
export declare class OrderProvider {
    private model;
    private response;
    constructor(model: PrismaService, response: Response);
    createOrder(body: OrderCreateDto, req?: any): Promise<any>;
    deleteOrder(ma_dat_ve: string): Promise<void>;
    getCurrentOrder(req: any): Promise<(import(".prisma/client").dat_ve & {
        lich_chieu: import(".prisma/client").lich_chieu & {
            rap_phim: import(".prisma/client").rap_phim & {
                cum_rap: import(".prisma/client").cum_rap & {
                    he_thong_rap: import(".prisma/client").he_thong_rap;
                };
            };
            phim: import(".prisma/client").phim & {
                nguoi_dung: import(".prisma/client").nguoi_dung & {
                    permission: {
                        permission_name: string;
                    };
                };
            };
        };
        nguoi_dung: import(".prisma/client").nguoi_dung & {
            permission: {
                permission_name: string;
            };
        };
        ghe: import(".prisma/client").ghe & {
            rap_phim: import(".prisma/client").rap_phim & {
                cum_rap: import(".prisma/client").cum_rap & {
                    he_thong_rap: import(".prisma/client").he_thong_rap;
                };
            };
        };
    })[]>;
}
