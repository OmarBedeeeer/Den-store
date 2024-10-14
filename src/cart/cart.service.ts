import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../schemas/cart.schema';
import { CreateCartDto } from './dtos/create-cart-dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const newCart = new this.cartModel(createCartDto);
    return newCart.save();
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().populate('user products.product').exec();
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartModel.findById(id).populate('user products.product').exec();
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
    if (!updatedCart) throw new NotFoundException('Cart not found');
    return updatedCart;
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.cartModel.findByIdAndDelete(id);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }
}
