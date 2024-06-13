import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cat/cat.service';
import { CatsController } from './cat/cat.controller';
import { Cat, CatSchema } from './cat/cat.schema';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:30002'),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [
    AppService,
    CatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
