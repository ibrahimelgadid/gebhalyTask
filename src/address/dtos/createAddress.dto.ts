import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/auth/auth.schema';

export class createAddressDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(14)
  @MinLength(11)
  phone: string;

  @IsEmpty()
  owner: User;
}
