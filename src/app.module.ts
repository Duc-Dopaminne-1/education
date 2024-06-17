import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CarsModule } from './Car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
//mongo
//mongodb://mongo1:30001,mongo2:30002,mongo3:30003/?replicaSet=my-replica-set
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo1:30001,mongo2:30002,mongo3:30003/?replicaSet=my-replica-set',
    ),
    CarsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
