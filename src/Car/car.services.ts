import { Injectable } from '@nestjs/common';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarDTO } from './dto/create-car-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}
  create(car: CreateCarDTO) {
    const createdCar = new this.carModel(car);
    return createdCar.save();
  }

  findAll(): Promise<Array<Car>> {
    return this.carModel.find().exec();
  }

  update(id: string, data: Partial<Car>): Promise<Car> {
    return this.carModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<Car> {
    return this.carModel.findByIdAndDelete(id).exec();
  }
}
