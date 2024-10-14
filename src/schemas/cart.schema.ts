import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: String, required: true, ref: 'User' })
  user: string;

  @Prop({
    type: [
      {
        product: { type: String, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: { product: string; quantity: number; price: number }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

