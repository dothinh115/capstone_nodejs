import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { DataController } from './data.controller';
import { DataProvider } from './data.service';

@Module({
  imports: [DataModule, PrismaModule],
  controllers: [DataController],
  providers: [DataProvider, Response],
})
export class DataModule {}
