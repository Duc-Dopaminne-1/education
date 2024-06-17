import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from './car.services';
import { Car } from './interface/car.interface';
import { CreateCarDTO } from './dto/create-car-dto';
import { UpdateCarDto } from './dto/update-car-dto';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCarDto) {
    return this.carServices.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.carServices.delete(id);
  }
}
