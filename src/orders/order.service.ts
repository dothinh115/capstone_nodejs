import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { orderConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import { orderNotFoundMessage } from 'src/utils/variables';
import { OrderCreateDto } from './dto/order.dto';

@Injectable()
export class OrderProvider {
  constructor(private model: PrismaService, private response: Response) {}
  async createOrder(body: OrderCreateDto, req?) {
    req
      ? (body = {
          ...body,
          tai_khoan: req.user.tai_khoan,
        })
      : body;
    const order = await this.model.dat_ve.create({
      data: body,
      include: {
        nguoi_dung: {
          include: {
            permission: {
              select: {
                permission_name: true,
              },
            },
          },
        },
        lich_chieu: {
          include: {
            rap_phim: {
              include: {
                cum_rap: {
                  include: {
                    he_thong_rap: true,
                  },
                },
              },
            },
            phim: {
              include: {
                nguoi_dung: {
                  include: {
                    permission: {
                      select: {
                        permission_name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ghe: {
          include: {
            rap_phim: {
              include: {
                cum_rap: {
                  include: {
                    he_thong_rap: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return orderConfig(order);
  }

  async deleteOrder(ma_dat_ve: string) {
    const order = await this.model.dat_ve.findFirst({
      where: {
        ma_dat_ve: +ma_dat_ve,
      },
    });
    if (!order)
      throw new HttpException(this.response.failRes(orderNotFoundMessage), 400);
    await this.model.dat_ve.delete({
      where: {
        ma_dat_ve: +ma_dat_ve,
      },
    });
  }
}
