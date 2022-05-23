import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaClient],
  exports: [NewsService, PrismaClient],
})
export class NewsModule {}
