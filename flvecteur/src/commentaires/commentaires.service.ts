import { Injectable } from '@nestjs/common';
import { PrismaClient, commentaires } from '@prisma/client';

@Injectable()
export class CommentairesService {
  constructor(private readonly prisma: PrismaClient) {}
  async getComentsGeneral(): Promise<commentaires[]> {
    return await this.prisma.commentaires.findMany({
      include: { user: { select: { nom: true, prenom: true } } },
      where: { type: 'general' },
      take: 20,
      orderBy: { id: 'desc' },
    });
  }

  async createComents(newcoment: commentaires): Promise<any> {
    return await this.prisma.commentaires.create({
      data: {
        userid: newcoment.userid,
        publie: true,
        date: new Date(),
        coments: newcoment.coments,
        type: 'general',
      },
    });
  }
}
