import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './common/guards/roles.guard';
import { RedisService } from '~/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async getHello(@Query('name') name: any): Promise<string> {
    console.log('AppController');
    // const value = await this.redisService.get('duc');
    // console.log('get 1 :', value);
    //
    // //
    // await this.redisService.set('duc', name);
    // const value2 = await this.redisService.get('duc');
    // console.log('insert && get 2:', value2);
    //
    // //
    // await this.redisService.del('duc');
    // const value3 = await this.redisService.get('duc');
    // console.log('delete && get 3:', value3);
    return this.appService.getHello(name);
  }
}
