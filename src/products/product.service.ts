import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, productDocument } from '../schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import {UpdateProductDto} from "./dtos/update-product.dto";
import { Vendor } from 'src/schemas/vendor.schema';
import { Cart } from 'src/schemas/cart.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product> ,
    @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>
) {}

async create(createProductDto: CreateProductDto): Promise<Product> {
  const vendor = await this.vendorModel.findById(createProductDto.vendor);
  if (!vendor) throw new NotFoundException('Vendor not found');
  const newProduct = new this.productModel({
    ...createProductDto,
    vendor: vendor._id
  });

  vendor.products.push(newProduct)
  await vendor.save()
  return newProduct.save();
}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate({path:"vendor", select: ["name", "email"]}).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate({path:"vendor", select: ["name", "email"]}).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { ...updateProductDto },
      { new: true }
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}