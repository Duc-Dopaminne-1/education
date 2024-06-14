
import { Injectable } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { CreateCarDTO } from './dto/create-car-dto';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [];

  create(car: CreateCarDTO) {
    this.cars.push(car);
  }

  findAll(): Car[] {
    return this.cars;
  }
}
