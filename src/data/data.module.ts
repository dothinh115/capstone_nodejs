import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { dataController } from './data.controller';
import { dataProvider } from './data.service';

@Module({
  imports: [dataModule, PrismaModule],
  controllers: [dataController],
  providers: [dataProvider, Response],
})
export class dataModule {}
