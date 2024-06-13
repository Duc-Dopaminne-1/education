import { Model, Types } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from "./cat.schema";
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<CatDocument> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.catModel.findByIdAndDelete({ _id: id }).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel.findByIdAndUpdate(
      id,
      updateCatDto,
      { new: true }
    );
    if (!existingCat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return existingCat;
  }
}
