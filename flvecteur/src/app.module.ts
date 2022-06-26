import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CommentairesModule } from './commentaires/commentaires.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../yakhasport/dist', 'yakhasport'),
      // rootPath: join(__dirname, '../yakhasport/dist', 'yakhasport'),
      // rootPath: join(__dirname, '..', 'front'),
      exclude: ['/api*'],
    }),
    MulterModule.register({
      dest: '../../yakhasport/dist/yakhasport/assets',
    }),
    UserModule,
    AuthModule,
    CommentairesModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
