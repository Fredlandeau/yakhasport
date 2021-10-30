import { Controller, Get } from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { commentaires } from '@prisma/client';

@Controller('commentaires')
export class CommentairesController {
  constructor(private readonly commentairesService: CommentairesService) {}

  @Get('general')
  getCommentairsGeneral(): Promise<commentaires[]> {
    return this.commentairesService.getComentsGeneral();
  }
}
