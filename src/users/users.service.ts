import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import {Cart} from "../schemas/cart.schema";
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  @InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) throw new NotFoundException('User already exists');
    const hashedPassword = await bcrypt.hash(createUserDto.password,Number(process.env.SALT_ROUNDS));

    const newCart = new this.cartModel({});
    const savedCart = await newCart.save();
    
    createUserDto.password = hashedPassword;
    const newUser = new this.userModel({...createUserDto, cart: savedCart._id});
    await newUser.populate('cart')

    return newUser.save();
  }
  //no Auth Yet
  async logIn(LoginUserDto:LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({email: LoginUserDto.email });
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(LoginUserDto.password, user.password);
    if (!isMatch) throw new NotFoundException('Incorrect password');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('cart').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('cart').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const userCart = await this.cartModel.findOne({cart: id});
    if (userCart) {
      await this.cartModel.findByIdAndDelete(userCart._id);
    }
    const user = await this.userModel.findByIdAndDelete(id);
    console.log(user);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}