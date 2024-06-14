import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
const path = require('path');
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      transformAutoSchemaFile: false,
      sortSchema: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    UserModule,
  ],
  // controllers: [AppController],
  // providers: [
  //   AppService,
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggingInterceptor,
  //   },
  //   UserService,
  // ],
})
export class AppModule {}
