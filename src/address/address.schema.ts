import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { User } from 'src/auth/auth.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema({
  timestamps: true,
})
export class Address extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
