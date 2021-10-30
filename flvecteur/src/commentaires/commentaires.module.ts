import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { CommentairesController } from './commentaires.controller';
import { CommentairesService } from './commentaires.service';

@Module({
  //  imports: [PrismaClient],
  controllers: [CommentairesController],
  providers: [CommentairesService, PrismaClient],
  exports: [CommentairesService, PrismaClient],
})
export class CommentairesModule {}
