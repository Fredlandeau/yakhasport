import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { commentaires } from '@prisma/client';

@Controller('commentaires')
export class CommentairesController {
  constructor(private readonly commentairesService: CommentairesService) {}

  @Get('general')
  async getCommentairsGeneral(): Promise<commentaires[]> {
    return await this.commentairesService.getComentsGeneral();
  }

  @Post()
  async addCommentaires(@Body() comment: commentaires): Promise<commentaires> {
    return await this.commentairesService.createComents(comment);
  }
}
