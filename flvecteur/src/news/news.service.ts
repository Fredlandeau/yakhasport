import { Injectable } from '@nestjs/common';
import { news, PrismaClient } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaClient) {}
  async getpublicnews(): Promise<news[]> {
    return await this.prisma.news.findMany({
      where: { type: 'news', publie: true },
      take: 20,
      orderBy: { order: 'asc' },
    });
  }

  async getallnews(): Promise<news[]> {
    return await this.prisma.news.findMany({
      where: { type: 'news' },
      take: 20,
      orderBy: { order: 'asc' },
    });
  }

  async createNews(newcontent: news): Promise<any> {
    return await this.prisma.news.create({
      data: {
        publie: true,
        date: new Date(),
        content: newcontent.content,
        type: 'news',
        order: newcontent.order,
      },
    });
  }

  async updateNews(id: number, content: news): Promise<news> {
    return await this.prisma.news.update({
      where: {
        id: id,
      },
      data: {
        ...content,
      },
    });
  }

  async deleteNews(id: number): Promise<news> {
    return await this.prisma.news.delete({
      where: { id: id },
    });
  }
}
