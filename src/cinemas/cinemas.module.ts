import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { CinemasController } from './cinemas.controller';
import { CinemasProvider } from './cinemas.service';

@Module({
  imports: [CinemasModule, PrismaModule],
  controllers: [CinemasController],
  providers: [CinemasProvider, Response],
})
export class CinemasModule {}
