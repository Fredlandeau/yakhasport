import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { news } from '@prisma/client';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewsService } from './news.service';

import { extname, join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { Observable, of } from 'rxjs';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const orderReccentFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

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

  @Get('images_old')
  display(@Res() res) {
    const lastImages = getMostRecentFile('./files/news');
    //  console.log(lastImages);
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile(lastImages.file, { root: './files/news' });
    // return lastImages;
  }

  @Get('image/:imagename')
  getImageNews(
    @Param('imagename') imagename: string,
    @Res() res,
  ): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'files/news/' + imagename)));
  }

  @Get('allimages')
  getFile() {
    const lastImages = orderReccentFiles('./files/news');
    // console.log('lastimage', lastImages);

    return lastImages;
    // res.end();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // destination: '../../yakhasport/dist/yakhasport/assets',
        destination: './files/news',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    const fileResponse = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return fileResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addNews(@Body() news: news): Promise<news> {
    return await this.newsService.createNews(news);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateNews(@Body() news: news, @Param('id') id: number): Promise<news> {
    return await this.newsService.updateNews(Number(id), news);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteNews(@Param('id') id: number): Promise<news> {
    return await this.newsService.deleteNews(Number(id));
  }
}
