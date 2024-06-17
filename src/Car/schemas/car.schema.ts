import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Car {
  @Prop({ required: true })
  model: string;
  @Prop({ required: true })
  year: number;
  @Prop({ required: true })
  brand: string;
}
export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
