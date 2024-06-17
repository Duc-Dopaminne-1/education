import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarsService } from './car.services';
import { Car } from './interface/car.interface';
import { CreateCarDTO } from './dto/create-car-dto';

@Controller('cars')
export class CarsController {
  constructor(private carServices: CarsService) {}
  @Get()
  findAll(): Promise<Array<Car>> {
    return this.carServices.findAll();
  }

  @Post()
  create(@Body() createCarDto: CreateCarDTO) {
    return this.carServices.create(createCarDto);
  }
}
