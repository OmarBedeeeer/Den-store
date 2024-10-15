import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}


  async findAll(): Promise<Cart[]> {
    //Can use Authorization For admin or Owner to check all carts
    return this.cartModel.find().populate('user products.product').exec();
  }

  async findOne(id: string): Promise<Cart> {
     //Can use Authorization For admin or Owner to check all carts
    const cart = await this.cartModel.findById(id).populate('user products.product').exec();
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }
}
