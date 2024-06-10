import {
  Controller,
  Get,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './common/guards/roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getHello(@Query('name') name: string): string {
    return this.appService.getHello(name);
  }
}
