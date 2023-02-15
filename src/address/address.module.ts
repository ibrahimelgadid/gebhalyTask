import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './address.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
