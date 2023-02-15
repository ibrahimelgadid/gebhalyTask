import { PartialType } from '@nestjs/mapped-types';
import { createAddressDto } from './createAddress.dto';

export class updateAddressDto extends PartialType(createAddressDto) {}
