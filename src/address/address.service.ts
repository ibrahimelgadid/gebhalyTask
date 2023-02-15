import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/auth.schema';
import { Address, AddressDocument } from './address.schema';
import { createAddressDto } from './dtos/createAddress.dto';
import { updateAddressDto } from './dtos/updateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<AddressDocument>,
  ) {}

  // get all addresses service
  async getAddresses(): Promise<Address[]> {
    return await this.addressModel
      .find()
      .sort({ createdAt: -1 })
      .populate('owner', 'username');
  }

  // get all addresses for specific user service
  async getAddressesForUser(owner): Promise<Address[]> {
    return await this.addressModel
      .find({ owner })
      .sort({ createdAt: -1 })
      .populate('owner', 'username');
  }

  // get address by id service
  async getAddressById(id: string): Promise<Address> {
    try {
      return await this.addressModel.findOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('This address id not found', {
        description: 'addressId',
      });
    }
  }

  // post new address
  async addAddress(addressData: createAddressDto, user: User) {
    // check if address already exists
    const phone = await this.addressModel
      .findOne({ phone: addressData.phone })
      .select('phone');

    if (phone) {
      throw new ConflictException('This phone number already exists', {
        description: 'phone',
      });
    }

    // create address
    addressData.owner = user._id;
    let address = new this.addressModel(addressData);
    await address.save();
    return { message: 'Address added successfully' };
  }

  // update address by id service
  async updateAddressById(id: string, addressData: updateAddressDto) {
    try {
      //check if address not exists
      const address = await this.addressModel.findOne({ _id: id });
      if (!address) {
        throw new NotFoundException('This address id not found', {
          description: 'addressId',
        });
      }
      // update address
      return await this.addressModel.findByIdAndUpdate(id, addressData, {
        new: true,
      });
    } catch (error) {
      throw new NotFoundException('This address id not found', {
        description: 'addressId',
      });
    }
  }

  // delete address by id service
  async deleteAddressById(id: string) {
    try {
      //check if address not exists
      const address = await this.addressModel.findOne({ _id: id });
      if (!address) {
        throw new NotFoundException('This address id not found', {
          description: 'addressId',
        });
      }

      // delete address
      return await this.addressModel.deleteOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('This address id not found', {
        description: 'addressId',
      });
    }
  }
}
