import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { OrderController } from './order.controller';
import { OrderProvider } from './order.service';

@Module({
  imports: [OrderModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderProvider, Response],
})
export class OrderModule {}
