import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { news } from '@prisma/client';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<news[]> {
    return await this.newsService.getallnews();
  }

  @Get('public')
  async getPublicNews(): Promise<news[]> {
    return await this.newsService.getpublicnews();
  }

  @Post()
  async addNews(@Body() news: news): Promise<news> {
    return await this.newsService.createNews(news);
  }

  @Put('/:id')
  async updateNews(@Body() news: news, @Param('id') id: number): Promise<news> {
    return await this.newsService.updateNews(Number(id), news);
  }

  @Delete('/:id')
  async deleteNews(@Param('id') id: number): Promise<news> {
    return await this.newsService.deleteNews(Number(id));
  }
}
