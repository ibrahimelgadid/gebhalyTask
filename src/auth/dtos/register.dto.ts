import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @Match('password')
  password2: string;
}
