import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { orderConfig, showTimesConfig } from 'src/utils/config';
import { Response } from 'src/utils/dto/global.dto';
import {
  alreadyExistedshowTimeMessage,
  alreadyOrderedMessage,
  notExistedUserMessage,
  orderNotFoundMessage,
  seatNotFoundMessage,
  showTimeNotFoundMessage,
} from 'src/utils/variables';
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
    const checkIfExistShowTime = await this.model.lich_chieu.findFirst({
      where: {
        ma_lich_chieu: +body.ma_lich_chieu,
      },
    });
    const checkIfExistUser = await this.model.nguoi_dung.findFirst({
      where: {
        tai_khoan: +body.tai_khoan,
      },
    });
    const checkExistingSeats = await this.model.ghe.findFirst({
      where: {
        ma_ghe: +body.ma_ghe,
      },
    });
    if (!checkExistingSeats)
      throw new HttpException(this.response.failRes(seatNotFoundMessage), 400);
    if (!checkIfExistUser)
      throw new HttpException(
        this.response.failRes(notExistedUserMessage),
        400,
      );
    if (!checkIfExistShowTime)
      throw new HttpException(
        this.response.failRes(showTimeNotFoundMessage),
        400,
      );

    const orderCheck = await this.model.dat_ve.findFirst({
      where: {
        AND: [
          {
            tai_khoan: body.tai_khoan,
          },
          {
            ma_lich_chieu: body.ma_lich_chieu,
          },
          {
            ma_ghe: body.ma_ghe,
          },
        ],
      },
    });

    if (orderCheck)
      throw new HttpException(
        this.response.failRes(alreadyOrderedMessage),
        400,
      );

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
  async getCurrentOrder(req: any) {
    const result = await this.model.dat_ve.findMany({
      where: {
        tai_khoan: req.user.taikhoan,
      },
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
    for (let key in result) {
      result[key] = orderConfig(result[key]);
    }
    return result;
  }
  async getOrderByShowTime(ma_lich_chieu: string) {
    const checkIfExistShowTime = await this.model.lich_chieu.findFirst({
      where: {
        ma_lich_chieu: +ma_lich_chieu,
      },
    });
    if (!checkIfExistShowTime)
      throw new HttpException(
        this.response.failRes(showTimeNotFoundMessage),
        400,
      );
    let result = await this.model.dat_ve.findMany({
      where: {
        ma_lich_chieu: +ma_lich_chieu,
      },
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
    for (let key in result) {
      result[key] = orderConfig(result[key]);
    }
    return result;
  }
}
