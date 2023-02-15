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

  @Get('')
  @UseGuards(AuthGuard())
  getAddresses(): Promise<Address[]> {
    return this.addressService.getAddresses();
  }

  @Get(':id/user')
  @UseGuards(AuthGuard())
  getAddressesForUser(@Param('id') id: string, @Req() req): Promise<Address[]> {
    return this.addressService.getAddressesForUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getAddressById(@Param('id') id: string): Promise<Address> {
    return this.addressService.getAddressById(id);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  createAddress(@Body() addressData: createAddressDto, @Req() req: any) {
    return this.addressService.addAddress(addressData, req.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateAddress(
    @Param('id') id: string,
    @Body() addressData: updateAddressDto,
  ) {
    return this.addressService.updateAddressById(id, addressData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddressById(id);
  }
}
