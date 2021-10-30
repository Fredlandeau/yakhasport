import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';

import * as fs from 'fs';
import * as path from 'path';

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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('planning')
  display(@Res() res) {
    const lastPlanning = getMostRecentFile('./files/planning');
    console.log(lastPlanning);
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile(lastPlanning.file, { root: './files/planning' });
  }

  @Post('upload/planning')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // destination: '../../yakhasport/dist/yakhasport/assets',
        destination: './files/planning',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileResponse = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return fileResponse;
  }
}
