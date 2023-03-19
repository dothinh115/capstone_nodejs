import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminStrategy } from 'src/strategy/admin.strategy';
import { Response } from 'src/utils/dto/global.dto';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from './movies.service';

@Module({
  imports: [MoviesModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesProvider, Response, AdminStrategy],
})
export class MoviesModule {}
