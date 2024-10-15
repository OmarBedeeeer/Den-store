import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument } from '../schemas/vendor.schema';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { UpdateVendorDto } from './dtos/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(@InjectModel(Vendor.name) private vendorModel: Model<Vendor>) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = await this.vendorModel.findOne({ name: createVendorDto.name });
    if (vendor) throw new NotFoundException('Vendor already exists');
  
    const newVendor = new this.vendorModel(createVendorDto);
    return newVendor.save();
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorModel.find().populate({path:"products", select: ["name"]}).exec();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorModel
      .findById(id)
      .populate({ path: 'products', select: ['name'] })
      .exec();
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async update(id: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    const updatedVendor = await this.vendorModel.findByIdAndUpdate(id, updateVendorDto, { new: true });
    if (!updatedVendor) throw new NotFoundException('Vendor not found');
    return updatedVendor;
  }

  async remove(id: string): Promise<Vendor> {
    const vendor = await this.vendorModel.findByIdAndDelete(id);
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }
}