import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
export type VendorDocument = Vendor & Document;@Schema()
export class Vendor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Product[];

  @Prop()
  address: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
