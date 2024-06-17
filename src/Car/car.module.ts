import { Module } from '@nestjs/common';
import { CarsController } from './car.controller';
import { CarsService } from './car.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
