import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { commentaires } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('commentaires')
export class CommentairesController {
  constructor(private readonly commentairesService: CommentairesService) {}

  @Get('general')
  async getCommentairsGeneral(): Promise<commentaires[]> {
    return await this.commentairesService.getComentsGeneral();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCommentaires(@Body() comment: commentaires): Promise<commentaires> {
    return await this.commentairesService.createComents(comment);
  }
}
