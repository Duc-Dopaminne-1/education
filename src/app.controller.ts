import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './common/guards/roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getHello(@Query('name') name: any): string {
    console.log('AppController');
    return this.appService.getHello(name);
  }
}
