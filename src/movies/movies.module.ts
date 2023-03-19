import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Response } from 'src/utils/dto/global.dto';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from './movies.service';

@Module({
  imports: [MoviesModule, PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesProvider, Response],
})
export class MoviesModule {}
