import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vendor } from './vendor.schema';

export type productDocument = Product & Document;

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Vendor' })
  vendor: Vendor;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  quantity: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);