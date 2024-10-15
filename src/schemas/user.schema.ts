import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Cart } from './cart.schema';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true,minlength: 6})
  password: string;

  @Prop({ required: true,minlength: 8, maxlength: 32 })
  fullName: string;

  @Prop({ default: 'customer' })
  role: string;

  // @Prop({ type: Types.ObjectId, ref: 'Product' })
  // wishList: Types.ObjectId;
  // @Prop({ default: false })
  // isVerified: boolean
  ;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
