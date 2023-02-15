import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Address } from './address.schema';
import { AddressService } from './address.service';
import { createAddressDto } from './dtos/createAddress.dto';
import { updateAddressDto } from './dtos/updateAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  // get all addresses route
  ////////////////////////////
  @Get('')
  @UseGuards(AuthGuard())
  getAddresses(): Promise<Address[]> {
    return this.addressService.getAddresses();
  }

  // get all addressess for specific route
  ////////////////////////////
  @Get(':id/user')
  @UseGuards(AuthGuard())
  getAddressesForUser(@Param('id') id: string, @Req() req): Promise<Address[]> {
    return this.addressService.getAddressesForUser(id);
  }

  // get address by id route
  ////////////////////////////
  @Get(':id')
  @UseGuards(AuthGuard())
  getAddressById(@Param('id') id: string): Promise<Address> {
    return this.addressService.getAddressById(id);
  }

  // post new address route
  ////////////////////////////
  @Post('create')
  @UseGuards(AuthGuard())
  createAddress(@Body() addressData: createAddressDto, @Req() req: any) {
    return this.addressService.addAddress(addressData, req.user);
  }

  // update address by id route
  ////////////////////////////
  @Patch(':id')
  @UseGuards(AuthGuard())
  updateAddress(
    @Param('id') id: string,
    @Body() addressData: updateAddressDto,
  ) {
    return this.addressService.updateAddressById(id, addressData);
  }

  // delete address by id route
  ////////////////////////////
  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddressById(id);
  }
}
