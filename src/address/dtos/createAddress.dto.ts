import { IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/auth.schema';
export class createAddressDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsEmpty()
  owner: User;
}
