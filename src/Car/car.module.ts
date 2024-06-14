import { Module } from "@nestjs/common";
import { CarsController } from "./car.controller";
import { CarsService } from "./car.services";

@Module({
    controllers: [CarsController],
    providers: [CarsService],
  })
  export class CarsModule {}
  